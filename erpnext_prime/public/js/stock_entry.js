frappe.ui.form.on('Stock Entry Detail', {
	item_code(frm, cdt, cdn){
		var stock_entry_detail_doc = frappe.get_doc(cdt, cdn)
		if(stock_entry_detail_doc){
			var item_code = stock_entry_detail_doc.item_code
			var item_prices = frappe.db.get_list('Item Price', {
				fields: ['price_list_rate'],
				filters: {
					item_code: item_code,
					price_list: "MRP",
					selling: 1
				}
			}).then(function(prices){
				if(prices.length >= 1){
					stock_entry_detail_doc.mrp = prices[0].price_list_rate
					frm.refresh()
				}
			})
		}

	}
})
