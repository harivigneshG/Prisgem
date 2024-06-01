frappe.provide("frappe.ui.toolbar");


class Toolbarnav extends frappe.ui.toolbar.Toolbar{

    constructor() {
        super(); 
		if (frappe.boot.prisgem_settings.hide_help_menu) {
            $('.dropdown-help').attr('style', 'display: none !important');
        }
        if (frappe.boot.prisgem_settings.logo_width_pixels) {
            $('.app-logo').css('width',frappe.boot.prisgem_settings.logo_width_pixels+'px');
        }
        if (frappe.boot.prisgem_settings.logo_height) {
            $('.app-logo').css('height',frappe.boot.prisgem_settings.logo_height+'px');
        }
        if (frappe.boot.prisgem_settings.navbar_background_color) {
            $('.navbar').css('background-color',frappe.boot.prisgem_settings.navbar_background_color)
        }
        if (frappe.boot.prisgem_settings.hide_notification_bell) {
            $('.dropdown-notifications').attr('style', 'display: none !important');
        }  

		this.toggle_full_width();
    }

	toggle_full_width() {
		if (frappe.boot.prisgem_settings.enable_full_width) {
			localStorage.container_fullwidth = "true";
			$(document.body).toggleClass("full-width", true);
		} else {
			localStorage.container_fullwidth = "false";
			$(document.body).toggleClass("full-width", false);
		}
		$(document.body).trigger("toggleFullWidth");
	}
}

frappe.ui.toolbar.Toolbar = Toolbarnav;


