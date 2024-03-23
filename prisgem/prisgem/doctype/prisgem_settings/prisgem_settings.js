// Copyright (c) 2024, Harivignesh G and contributors
// For license information, please see license.txt

frappe.ui.form.on("Prisgem Settings", {
    after_save: function(frm) {
		frappe.ui.toolbar.clear_cache();
	}
});
