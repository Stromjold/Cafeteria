function addProduct() {
            // ... (código de validación existente) ...

            const supplier = suppliers.find(s => s.id === supplierId);
            const subtotal = quantity * unitPrice;

            const product = {
                id: Date.now().toString(),
                supplierId: supplierId,
                supplierName: supplier.name,
                productName: productName,
                productId: productId,
                expiryDate: expiryDate,
                quantity: quantity,
                unitPrice: unitPrice,
                subtotal: subtotal
            };

            // **Nuevo código para guardar en la base de datos**
            const formData = new FormData();
            formData.append('nombre', product.productName);
            formData.append('proveedor', product.supplierName);
            formData.append('id_producto', product.productId);
            formData.append('fecha_vencimiento', product.expiryDate);
            formData.append('cantidad', product.quantity);
            formData.append('precio_unitario', product.unitPrice);

            fetch('PHP/guardar_producto.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    products.push(product); // Solo agrega el producto si se guarda exitosamente
                    updateProductsTable();
                    clearForm();
                    alert(data.message);
                } else {
                    alert('Error al guardar el producto: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error de conexión con el servidor.');
            });
            // **Fin del nuevo código**

            products.push(product);
            updateProductsTable();
            clearForm();
        }