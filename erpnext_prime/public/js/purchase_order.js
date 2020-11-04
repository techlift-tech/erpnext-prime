frappe.ui.form.on('Purchase Order Item', {
	item_code(frm, cdt, cdn){
		var purchase_order_entry_doc = frappe.get_doc(cdt, cdn)
		if(purchase_order_entry_doc){
			var item_code = purchase_order_entry_doc.item_code
			var item_prices = frappe.db.get_list('Item Price', {
				fields: ['price_list_rate'],
				filters: {
					item_code: item_code,
					price_list: "MRP",
					selling: 1
				}
			}).then(function(prices){
				if(prices.length >= 1){
					purchase_order_entry_doc.mrp = prices[0].price_list_rate
					frm.refresh_field("items")
				}
			})
		}

	}
})
