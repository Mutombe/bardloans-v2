from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.conf import settings

from .models import LoanApplication
from .pdf_generator import generate_application_pdf


FIELD_MAP = {
    'surname': 'surname', 'firstName': 'first_name', 'idNumber': 'id_number',
    'dateOfBirth': 'date_of_birth', 'maritalStatus': 'marital_status', 'gender': 'gender',
    'residentialAddress': 'residential_address', 'emailAddress': 'email_address',
    'contactNumber': 'contact_number', 'alternativeNumber': 'alternative_number',
    'nextOfKin': 'next_of_kin', 'relationship': 'relationship', 'nextOfKinContact': 'next_of_kin_contact',
    'employerName': 'employer_name', 'positionHeld': 'position_held',
    'contractType': 'contract_type', 'employeeNumber': 'employee_number',
    'employmentDate': 'employment_date', 'contractExpiryDate': 'contract_expiry_date',
    'supervisorName': 'supervisor_name', 'supervisorContact': 'supervisor_contact',
    'employerAddress': 'employer_address',
    'bankName': 'bank_name', 'branch': 'branch',
    'accountNumber': 'account_number', 'accountName': 'account_name',
    'loanAmount': 'loan_amount', 'loanInstallment': 'loan_installment',
    'repaymentPeriod': 'repayment_period', 'loanPurpose': 'loan_purpose',
}


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def apply_for_loan(request):
    data = request.data

    # Map camelCase form fields to snake_case model fields
    model_data = {}
    for js_key, model_key in FIELD_MAP.items():
        val = data.get(js_key, '')
        if val == '' and model_key in ('date_of_birth', 'employment_date', 'contract_expiry_date', 'loan_installment'):
            val = None
        model_data[model_key] = val

    # Required field validation
    required = ['surname', 'first_name', 'id_number', 'contact_number', 'employer_name', 'position_held', 'bank_name', 'account_number', 'loan_amount']
    missing = [f for f in required if not model_data.get(f)]
    if missing:
        return Response({'error': f'Missing required fields: {", ".join(missing)}'}, status=status.HTTP_400_BAD_REQUEST)

    # Files
    id_doc = request.FILES.get('idDocument')
    proof = request.FILES.get('proofOfEmployment')
    signature = data.get('signature', '')

    if not id_doc or not proof:
        return Response({'error': 'Both ID document and proof of employment are required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not signature:
        return Response({'error': 'Digital signature is required.'}, status=status.HTTP_400_BAD_REQUEST)

    model_data['signature_image'] = signature

    # Save to database
    app = LoanApplication(**model_data)
    app.id_document = id_doc
    app.proof_of_employment = proof
    app.save()

    # Generate signed PDF
    pdf_buf = generate_application_pdf(app)

    # Send email with PDF + attachments
    try:
        subject = f'New Loan Application - {app.first_name} {app.surname} - R{app.loan_amount}'
        body = (
            f'New loan application received:\n\n'
            f'Applicant: {app.first_name} {app.surname}\n'
            f'ID Number: {app.id_number}\n'
            f'Contact: {app.contact_number}\n'
            f'Email: {app.email_address}\n'
            f'Employer: {app.employer_name}\n'
            f'Loan Amount: R{app.loan_amount}\n'
            f'Repayment Period: {app.repayment_period} month(s)\n'
            f'Purpose: {app.loan_purpose}\n\n'
            f'The signed application form is attached as a PDF.\n'
            f'ID document and proof of employment are also attached.\n'
        )

        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=settings.LOAN_APPLICATION_EMAILS,
        )

        # Attach the signed PDF
        email.attach(
            f'Loan_Application_{app.surname}_{app.first_name}.pdf',
            pdf_buf.read(),
            'application/pdf'
        )

        # Attach uploaded documents
        email.attach(id_doc.name, id_doc.read(), id_doc.content_type)
        email.attach(proof.name, proof.read(), proof.content_type)

        email.send(fail_silently=False)
    except Exception as e:
        # Application saved even if email fails — can be resent manually
        return Response({
            'status': 'submitted',
            'message': 'Application saved but email delivery failed. We will process it manually.',
            'id': app.id,
        }, status=status.HTTP_201_CREATED)

    return Response({
        'status': 'submitted',
        'message': 'Application received successfully. Check your email for confirmation.',
        'id': app.id,
    }, status=status.HTTP_201_CREATED)
