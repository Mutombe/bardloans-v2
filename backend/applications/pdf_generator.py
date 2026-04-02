import io
import os
import base64
from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

FAVICON_PATH = os.path.join(os.path.dirname(__file__), 'favicon.png')


NAVY = HexColor('#1B1464')
ORANGE = HexColor('#E8891D')
GRAY = HexColor('#666666')
LIGHT = HexColor('#F5F5F4')


def flatten_signature(sig_bytes):
    """Flatten a transparent PNG signature onto a white background."""
    img = Image.open(io.BytesIO(sig_bytes)).convert('RGBA')
    white_bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
    composited = Image.alpha_composite(white_bg, img)
    composited = composited.convert('RGB')
    out = io.BytesIO()
    composited.save(out, format='PNG')
    out.seek(0)
    return out


def is_image_file(file_obj):
    """Check if an uploaded file is an image (JPEG/PNG)."""
    if not file_obj:
        return False
    ct = getattr(file_obj, 'content_type', '') or ''
    name = getattr(file_obj, 'name', '') or ''
    return ct.startswith('image/') or name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'))


def add_document_page(c, w, h, title, file_obj):
    """Add a new PDF page with an embedded uploaded document image."""
    c.showPage()
    # Header bar
    c.setFillColor(NAVY)
    c.rect(0, h - 25 * mm, w, 25 * mm, fill=True, stroke=False)
    c.setFillColor(ORANGE)
    c.rect(0, h - 27 * mm, w, 2 * mm, fill=True, stroke=False)
    c.setFillColor(HexColor('#FFFFFF'))
    c.setFont('Helvetica-Bold', 14)
    c.drawString(25 * mm, h - 17 * mm, title)

    try:
        file_obj.seek(0)
        img_bytes = file_obj.read()
        img = Image.open(io.BytesIO(img_bytes))
        img_w, img_h = img.size

        # Available area: page minus header and footer margins
        max_w = w - 40 * mm
        max_h = h - 60 * mm

        # Scale to fit
        scale = min(max_w / img_w, max_h / img_h, 1.0)
        draw_w = img_w * scale
        draw_h = img_h * scale

        # Center horizontally, place below header
        x = (w - draw_w) / 2
        y = h - 35 * mm - draw_h

        file_obj.seek(0)
        img_reader = ImageReader(io.BytesIO(img_bytes))
        c.drawImage(img_reader, x, y, width=draw_w, height=draw_h, preserveAspectRatio=True)
    except Exception:
        c.setFont('Helvetica', 10)
        c.setFillColor(GRAY)
        c.drawString(25 * mm, h - 45 * mm, f'[Document attached separately — could not embed: {file_obj.name}]')

    # Footer
    c.setFont('Helvetica', 6)
    c.setFillColor(GRAY)
    c.drawString(25 * mm, 10 * mm, 'Bard Loans — Authorised Financial Services Provider — NCRCP12840')


def draw_section_header(c, y, title):
    c.setFillColor(NAVY)
    c.rect(20 * mm, y - 1 * mm, 170 * mm, 7 * mm, fill=True, stroke=False)
    c.setFillColor(HexColor('#FFFFFF'))
    c.setFont('Helvetica-Bold', 10)
    c.drawString(25 * mm, y + 1 * mm, title)
    return y - 12 * mm


def draw_field(c, y, label, value, x=25 * mm, width=75 * mm):
    c.setFont('Helvetica', 7)
    c.setFillColor(GRAY)
    c.drawString(x, y + 3 * mm, label)
    c.setFont('Helvetica-Bold', 9)
    c.setFillColor(NAVY)
    c.drawString(x, y - 2 * mm, str(value or '—'))
    c.setStrokeColor(HexColor('#E0E0E0'))
    c.line(x, y - 4 * mm, x + width, y - 4 * mm)
    return y - 12 * mm


def draw_field_row(c, y, fields):
    """Draw a row of (label, value) pairs across the page."""
    col_width = 80 * mm
    for i, (label, value) in enumerate(fields):
        x = 25 * mm + i * col_width
        draw_field(c, y, label, value, x=x, width=70 * mm)
    return y - 12 * mm


def generate_application_pdf(app, id_document=None, proof_of_employment=None):
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    w, h = A4

    # Header
    c.setFillColor(NAVY)
    c.rect(0, h - 28 * mm, w, 28 * mm, fill=True, stroke=False)
    c.setFillColor(ORANGE)
    c.rect(0, h - 30 * mm, w, 2 * mm, fill=True, stroke=False)

    # Favicon + title
    if os.path.exists(FAVICON_PATH):
        try:
            icon = ImageReader(FAVICON_PATH)
            c.drawImage(icon, 18 * mm, h - 23 * mm, width=14 * mm, height=14 * mm, preserveAspectRatio=True, mask='auto')
        except Exception:
            pass

    c.setFillColor(HexColor('#FFFFFF'))
    c.setFont('Helvetica-Bold', 16)
    c.drawString(35 * mm, h - 18 * mm, 'BARD LOANS')
    c.setFont('Helvetica', 9)
    c.drawString(130 * mm, h - 12 * mm, 'LOAN APPLICATION FORM')
    c.drawString(130 * mm, h - 17 * mm, f'Date: {app.application_date}')

    y = h - 40 * mm

    # Personal Details
    y = draw_section_header(c, y, 'PERSONAL DETAILS')
    y = draw_field_row(c, y, [('Surname', app.surname), ('First Name', app.first_name)])
    y = draw_field_row(c, y, [('ID Number', app.id_number), ('Date of Birth', app.date_of_birth)])
    y = draw_field_row(c, y, [('Marital Status', app.marital_status), ('Gender', app.gender)])
    y = draw_field(c, y, 'Residential Address', app.residential_address, width=160 * mm)
    y = draw_field(c, y, 'Email Address', app.email_address, width=160 * mm)
    y = draw_field_row(c, y, [('Contact Number', app.contact_number), ('Alternative Number', app.alternative_number)])
    y = draw_field_row(c, y, [('Next of Kin', app.next_of_kin), ('Relationship', app.relationship)])

    # Employment Details
    y = draw_section_header(c, y, 'EMPLOYMENT DETAILS')
    y = draw_field_row(c, y, [('Name of Employer', app.employer_name), ('Position Held', app.position_held)])
    y = draw_field_row(c, y, [('Contract Type', app.contract_type), ('Employee Number', app.employee_number)])
    y = draw_field_row(c, y, [('Employment Date', app.employment_date), ('Contract Expiry', app.contract_expiry_date)])
    y = draw_field_row(c, y, [('Supervisor', app.supervisor_name), ('Supervisor Contact', app.supervisor_contact)])

    # Banking Details
    y = draw_section_header(c, y, 'BANKING DETAILS')
    y = draw_field_row(c, y, [('Bank Name', app.bank_name), ('Branch', app.branch)])
    y = draw_field_row(c, y, [('Account Number', app.account_number), ('Account Name', app.account_name)])

    # Loan Details
    y = draw_section_header(c, y, 'LOAN APPLICATION DETAILS')
    y = draw_field_row(c, y, [('Loan Amount', f'R{app.loan_amount}'), ('Loan Installment', f'R{app.loan_installment or "—"}')])
    y = draw_field_row(c, y, [('Repayment Period', f'{app.repayment_period} month(s)'), ('Loan Purpose', app.loan_purpose)])

    # Signature
    y -= 5 * mm
    if y < 80 * mm:
        c.showPage()
        y = h - 30 * mm

    y = draw_section_header(c, y, 'APPLICANT SIGNATURE')

    if app.signature_image and app.signature_image.startswith('data:'):
        try:
            sig_data = app.signature_image.split(',')[1]
            sig_bytes = base64.b64decode(sig_data)
            # Flatten transparent PNG onto white background so it doesn't render as black
            sig_buf = flatten_signature(sig_bytes)
            sig_img = ImageReader(sig_buf)
            c.drawImage(sig_img, 25 * mm, y - 25 * mm, width=60 * mm, height=20 * mm, preserveAspectRatio=True)
        except Exception:
            c.setFont('Helvetica', 9)
            c.drawString(25 * mm, y - 5 * mm, '[Signature captured digitally]')

    c.setFont('Helvetica', 8)
    c.setFillColor(GRAY)
    c.drawString(100 * mm, y - 5 * mm, f'Date: {app.application_date}')
    c.drawString(100 * mm, y - 12 * mm, f'Applicant: {app.first_name} {app.surname}')

    # Footer
    c.setFont('Helvetica', 6)
    c.setFillColor(GRAY)
    c.drawString(25 * mm, 15 * mm, 'Bard Loans — Authorised Financial Services Provider — Registered Credit Provider NCRCP12840')
    c.drawString(25 * mm, 10 * mm, '2nd Floor Bowmans Building, 11 Alice Lane, Sandton, 2196 | apply@bardloans.co.za | 067 615 1569')

    # Embed uploaded documents as additional pages if they are images
    if id_document and is_image_file(id_document):
        add_document_page(c, w, h, 'ATTACHED: ID DOCUMENT', id_document)

    if proof_of_employment and is_image_file(proof_of_employment):
        add_document_page(c, w, h, 'ATTACHED: PROOF OF EMPLOYMENT', proof_of_employment)

    c.save()
    buf.seek(0)
    return buf
