frappe.pages['daily-document-status'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Creation Count',
		single_column: true
	});

	let Year = page.add_field({

		label: 'Year',
		fieldtype: 'Select',
		fieldname: 'Year',
		options: [
			parseInt(frappe.datetime.get_today().slice(0,4)),
			parseInt(frappe.datetime.get_today().slice(0,4)) - 1
		],
		default : parseInt(frappe.datetime.get_today().slice(0,4))
		
	});


	months = [
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]

	let month_select = page.add_field({

		label: 'Month',
		fieldtype: 'Select',
		fieldname: 'month',
		options: months,
		default : months[parseInt(frappe.datetime.get_today().slice(5,8)) - 1 ]
	});


	let doc = page.add_field({

		fieldname: "link_doctype",
		fieldtype: "Link",
		label: "Document",
		options: "DocType",
		change : ()=>{
			let document = doc.get_value();
		console.log(  months.indexOf(month_select.get_value()) + 1 )
		if (document === "") {
			frappe.throw(_("Please Select the Document to check"))
		} if(Year == "" || month_select == "" ) {
			frappe.throw(_("Please Select the Document to check"))
		}
		else{
			// make_request( parseInt(frappe.datetime.get_today().slice(0,4)), months[parseInt(frappe.datetime.get_today().slice(5,8)) - 1 ] , document )

			frappe.call({
				method : "prisgem.prisgem.page.daily_document_status.daily_document_status.calculate_doc_count",
			args:{
				"year" :  parseInt(Year.get_value()),
				"month":  parseInt(months.indexOf(month_select.get_value()) + 1 ),
				"doc" : doc.get_value()
			},
			callback:(r)=>{
				console.log(r)
	
			}
		});
		}

		}
	})



	// make_request()
	// {

	// 	frappe.call({
	// 		method : "prisgem.prisgem.page.daily_document_status.daily_document_status.calculate_doc_count",
	// 	args:{
	// 		"year" :  Year.get_value(),
	// 		"month":  month_select.get_value(),
	// 		"doc" : doc.get_value()
	// 	},
	// 	callback:(r)=>{
	// 		console.log(r)

	// 	}
	// });
	// }
	
}