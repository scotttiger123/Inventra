import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateInvoice = () => {
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState('');
  const [total, setTotal] = useState(0);

  const addItem = () => {
    if (productName.trim() === '' || isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid product details.');
      return;
    }
    const newItem = {
      id: items.length + 1,
      name: productName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    setItems([...items, newItem]);
    setTotal(total + newItem.quantity * newItem.price);
    setProductName('');
    setQuantity('');
    setPrice('');
  };

  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    const itemToRemove = items.find(item => item.id === id);
    setTotal(total - itemToRemove.quantity * itemToRemove.price);
    setItems(updatedItems);
  };

  const calculateFinalAmount = () => {
    const discountValue = parseFloat(discount) || 0;
    return total - discountValue;
  };

  const handleSave = () => {
    // Logic to save the invoice
    console.log('Invoice saved');
  };

  const handleSaveAndNew = () => {
    // Logic to save the invoice and clear fields for new invoice
    console.log('Invoice saved and new invoice started');
    setInvoiceNo('');
    setDate('');
    setCustomerName('');
    setProductName('');
    setQuantity('');
    setPrice('');
    setItems([]);
    setDiscount('');
    setTotal(0);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Invoice Details Section */}
        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.inputContainerHalf]}>
            <IconI name="receipt" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Invoice No"
              value={invoiceNo}
              onChangeText={setInvoiceNo}
            />
          </View>
          <View style={[styles.inputContainer, styles.inputContainerHalf]}>
            <Icon name="calendar" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={date}
              onChangeText={setDate}
            />
          </View>
        </View>

        {/* Customer Details Section */}
        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.customerInputContainer]}>
            <Icon name="user" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>
        </View>

        {/* Add Items Section */}
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <Icon name="tag" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
            />
          </View>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.inputContainerQuarter]}>
              <Icon name="hashtag" size={20} color="#333" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={quantity}
                keyboardType="numeric"
                onChangeText={setQuantity}
              />
            </View>
            <View style={[styles.inputContainer, styles.inputContainerQuarter]}>
              <Icon name="money" size={20} color="#333" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                keyboardType="numeric"
                onChangeText={setPrice}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <IconM name="plus-circle" size={24} color="#fff" style={styles.addIcon} />
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        </View>


       <View style={styles.itemsSection}>
          
          {items.length === 0 ? (
            <Text style={styles.emptyText}>No items added</Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemRow}>
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetailText}>
                      {item.quantity} X {item.price.toFixed(2)}
                    </Text>
                  </View>
                  <Text style={styles.itemTotalText}>Rs.
                    {(item.quantity * item.price).toFixed(2)}
                  </Text>
                </View>
              )}
            />
          )}
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryText}>{total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Icon name="percent" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Discount"
              value={discount}
              keyboardType="numeric"
              onChangeText={setDiscount}
            />
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Final Amount</Text>
            <Text style={styles.summaryText}>{calculateFinalAmount().toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Buttons */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.saveAndPrintButton} onPress={handleSaveAndNew}>
          <IconM name="printer" size={24} color="#fff" style={styles.saveIcon} />
          <Text style={styles.saveButtonText}>Save & Print</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <IconM name="content-save" size={24} color="#fff" style={styles.saveIcon} />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveAndNewButton} onPress={handleSaveAndNew}>
          <IconM name="content-save-all" size={24} color="#fff" style={styles.saveIcon} />
          <Text style={styles.saveButtonText}>Save & New</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#f9f9f9', // Light gray background color
  },
  itemTextContainer: {
    flex: 7,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDetailText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  itemTotalText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    flex: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
  },


  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginRight: 10,
  },
  inputContainerHalf: {
    flex: 1,
  },
  customerInputContainer: {
    flex: 2,
  },
  inputContainerQuarter: {
    flex: 1,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14, // Consistent font size
  },
  icon: {
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  addIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14, // Consistent font size
    marginLeft: 8,
  },
  
  summarySection: {
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14, // Consistent font size
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 14, // Consistent font size
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    backgroundColor: '#fff', // Ensure footer background is white
    
  },
  saveButton: {
    backgroundColor: '#000', // Black background for DOWNLOAD button
    padding: 8, // Reduced padding
    borderRadius: 5,
    flex: 1,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5, // Subtle border width
    borderColor: '#e0e0e0', // Subtle border color
  },
  saveAndNewButton: {
    backgroundColor: '#25D366', // WhatsApp's original color
    padding: 8,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5, // Subtle border width
    borderColor: '#e0e0e0', // Subtle border color
    
  },
  saveAndPrintButton: {
    backgroundColor: '#e1e1e1', // WhatsApp's original color
    padding: 8,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5, // Subtle border width
    borderColor: '#e1e1e1', // Subtle border color
  },
  saveIcon: {
    marginRight: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14, // Consistent font size
  },
});

export default CreateInvoice;
