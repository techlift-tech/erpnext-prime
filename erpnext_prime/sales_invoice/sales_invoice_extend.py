from __future__ import unicode_literals
import frappe
from frappe.core.doctype.sms_settings.sms_settings import send_sms

def send_pos_sms(doc, method):
    if doc.is_pos and doc.contact_mobile:
            prime_settings = frappe.get_doc('Prime Settings')
            pos_sms_msg = prime_settings.pos_sms_text
            context = {"doc": doc}
            message = frappe.render_template(pos_sms_msg, context)
            numbers = [doc.contact_mobile]
            send_sms(numbers, message)

@frappe.whitelist()
def get_customer_loyalty_points(customer, loyalty_program):
    from erpnext.accounts.party import get_dashboard_info
    return get_dashboard_info("Customer", customer, loyalty_program)

def test_fn():
    return True
