from django.db import models


class LoanApplication(models.Model):
    # Personal
    surname = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    id_number = models.CharField(max_length=20)
    date_of_birth = models.DateField(null=True, blank=True)
    marital_status = models.CharField(max_length=20, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    residential_address = models.TextField(blank=True)
    email_address = models.EmailField(blank=True)
    contact_number = models.CharField(max_length=20)
    alternative_number = models.CharField(max_length=20, blank=True)
    next_of_kin = models.CharField(max_length=100, blank=True)
    relationship = models.CharField(max_length=50, blank=True)
    next_of_kin_contact = models.CharField(max_length=20, blank=True)

    # Employment
    employer_name = models.CharField(max_length=200)
    position_held = models.CharField(max_length=100)
    contract_type = models.CharField(max_length=20, default='Permanent')
    employee_number = models.CharField(max_length=50, blank=True)
    employment_date = models.DateField(null=True, blank=True)
    contract_expiry_date = models.DateField(null=True, blank=True)
    supervisor_name = models.CharField(max_length=100, blank=True)
    supervisor_contact = models.CharField(max_length=20, blank=True)
    employer_address = models.TextField(blank=True)

    # Banking
    bank_name = models.CharField(max_length=100)
    branch = models.CharField(max_length=100, blank=True)
    account_number = models.CharField(max_length=30)
    account_name = models.CharField(max_length=100, blank=True)

    # Loan
    loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    loan_installment = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    repayment_period = models.IntegerField(default=1)
    loan_purpose = models.CharField(max_length=200, blank=True)

    # Files
    id_document = models.FileField(upload_to='id_documents/')
    proof_of_employment = models.FileField(upload_to='proof_of_employment/')
    signature_image = models.TextField()  # base64 PNG

    # Meta
    application_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.first_name} {self.surname} - R{self.loan_amount}'
