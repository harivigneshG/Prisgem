import frappe


def set_bootinfo(bootinfo):
    if frappe.session.user != "Guest":
        prisgem_settings = frappe.get_doc("Prisgem Settings", "Prisgem Settings")
        bootinfo["prisgem_settings"] = prisgem_settings