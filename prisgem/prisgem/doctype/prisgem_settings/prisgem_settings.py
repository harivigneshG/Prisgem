# Copyright (c) 2024, Harivignesh G and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.installer import update_site_config


class PrisgemSettings(Document):
	def validate(self):
		system_settings= frappe.get_doc("System Settings","System Settings")
		navbar_settings = frappe.get_doc("Navbar Settings","Navbar Settings")
		website_doc = frappe.get_doc("Website Settings","Website Settings")
		self.make_app_name(system_settings,website_doc)
		self.make_theme_attr(navbar_settings,website_doc)
		self.disable_onboarding(system_settings)
		system_settings.save(ignore_permissions = True)
		navbar_settings.save(ignore_permissions = True)
		website_doc.save(ignore_permissions = True)

	def make_app_name(self,system_settings,website_doc):	
		if self.app_name:
			system_settings.app_name = self.app_name
			website_doc.app_name = self.app_name
		else:
			if "erpnext" in frappe.get_installed_apps():
				system_settings.app_name = "ERPNext"
			else:
				system_settings.app_name = "Frappe"
	
	def make_theme_attr(self,navbar_settings,website_doc):
		if self.app_logo:
			navbar_settings.app_logo = self.app_logo
			website_doc.app_logo = self.app_logo
			update_site_config("app_logo_url",self.app_logo)
			frappe.clear_cache()
		else:
			navbar_settings.app_logo = ""
			website_doc.app_logo = ""
			update_site_config("app_logo_url",False)
			frappe.clear_cache()

	def disable_onboarding(self,system_settings):
		if self.avoid_onboarding == 1:
			system_settings.enable_onboarding = 0
		else:
			system_settings.enable_onboarding = 1