

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
			parseInt(frappe.datetime.get_today().slice(0, 4)),
			parseInt(frappe.datetime.get_today().slice(0, 4)) - 1
		],
		default: parseInt(frappe.datetime.get_today().slice(0, 4)),
		change: () => {
			get_doc_count()	
		}
	});

	let months = [
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	];

	let month_select = page.add_field({
		label: 'Month',
		fieldtype: 'Select',
		fieldname: 'month',
		options: months,
		default: months[parseInt(frappe.datetime.get_today().slice(5, 8)) - 1],
		change: () => {
			get_doc_count()	
		}
	});

	let doc = page.add_field({
		fieldname: "link_doctype",
		fieldtype: "Link",
		label: "Document",
		options: "DocType",
		change: () => {
			get_doc_count()	
		}
	});

	function get_doc_count(){
		let document = doc.get_value();

			if (document === "") {
				frappe.throw(_("Please Select the Document to check"));
			} 
			else if (Year.get_value() === "" || month_select.get_value() === "") {
				frappe.throw(_("Please Select the Year and Month"));
			} 
			else {
				// Remove any existing calendar element
				$(wrapper).find("#calendar").remove();

				frappe.call({
					method: "prisgem.prisgem.page.daily_document_status.daily_document_status.calculate_doc_count",
					args: {
						"year": parseInt(Year.get_value()),
						"month": parseInt(month_select.get_value()+ 1) | parseInt(months.indexOf(month_select.get_value()) + 1),
						"doc": doc.get_value()
					},
					callback: (r) => {
						generate_calender(r.message)
					}
				});
			}
	}


	function generate_calender(counts){
		let calendar_box = $(`
			<div id="calendar">
				<div class="calendar-header">
					<h2>${months[parseInt(months.indexOf(month_select.get_value()))]} ${Year.get_value()}</h2>
				</div>
				<div class="calendar-weekdays">
					<div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
				</div>
				<div class="calendar-days"></div>
			</div>
		`);
		$(wrapper).find(".page-body").append(calendar_box);

		const today = new Date();
		const year = parseInt(Year.get_value());
		const month = parseInt(months.indexOf(month_select.get_value()) );
		const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week the month starts on
		const daysInMonth = new Date(year, month + 1 , 0).getDate(); // Number of days in selected month
		const calendarDaysElement = $(wrapper).find(".calendar-days");
		const countsMap = new Map(counts.map(item => [item.date, item.created]));

		console.log(month, firstDayOfMonth, today.toDateString())
		// Add empty slots for days of the previous month
		for (let i = 0; i < firstDayOfMonth; i++) {
			calendarDaysElement.append('<div class="day empty"></div>');
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month , day);
			const formattedDate = date.toLocaleDateString('en-CA');  // YYYY-MM-DD format
			let count = countsMap.get(formattedDate) || "-" ;
			console.log(count, formattedDate)

			let countClass = count > 0 ? 'count-positive' : 'count-zero';
			let dayClass = count > 0 ? '' : 'no-count';

			if (date.toDateString() === today.toDateString()) {
				dayClass += ' today';
			}


			// Create the day element
			let dayElement = $(`
				<div class="day ${dayClass}">
					<h3>${day}</h3>
					<div class="count ${countClass}">${count}</div>
				</div>
			`);

			calendarDaysElement.append(dayElement); // Append the day element to the calendar
		}
	}
};