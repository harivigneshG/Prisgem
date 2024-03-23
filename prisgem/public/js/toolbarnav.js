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


		this.set_toggle_width();
		// $('.navbar').css('background-color', "#264135")
		
       
    }

	set_toggle_width(){
		if (frappe.boot.prisgem_settings.enable_full_width) {
			console.log(frappe.boot.prisgem_settings)

			$(document).ready(function() {
				console.log(frappe.boot.prisgem_settings)
				let fullwidth = "true";
				$(document.body).toggleClass("full-width", fullwidth);
				$(document.body).trigger("toggleFullWidth");
			});
	}
	// else{
	// 	$(document).ready(function() {
	// 		let fullwidth = "false";
	// 		$(document.body).toggleClass("full-width", fullwidth);
	// 		$(document.body).trigger("toggleFullWidth");
	// 	});

	// }
		
	}
}

frappe.ui.toolbar.Toolbar = Toolbarnav;


