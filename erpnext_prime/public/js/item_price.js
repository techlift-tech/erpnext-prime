frappe.ui.form.on('Item Price', {
	onload(frm){
		var item_code = frm.doc.item_code
		var item = frappe.db.get_doc('Item', item_code)
			.then(function(item){
				frm.set_value("hsn", item.gst_hsn_code)
				frm.refresh()
			})
	}
})
