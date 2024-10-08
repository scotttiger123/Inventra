import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateInvoice = () => {
  const navigation = useNavigation();
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState('');
  const [total, setTotal] = useState(0);

  const addItemToList = (newItem) => {
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setTotal(total + newItem.quantity * newItem.price);
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
    setItems([]);
    setDiscount('');
    setTotal(0);
  };

  return (
    <View style={styles.container}>
      {/* Invoice Details Section */}
      <View style={styles.row}>
        <View style={[styles.inputContainer, styles.inputContainerHalf]}>
          <IconM name="file-find-outline" size={22} color="#333" style={styles.icon} />
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
      <View style={[styles.inputContainer, styles.inputContainerHalf]}>
          <TouchableOpacity style={styles.addCustomerButton} onPress={() => console.log('Customer Added')}>
            <IconM name="account-plus-outline" size={24} color="#000" />
          </TouchableOpacity>
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
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddItemScreen', { addItemToList })}>
          <IconM name="plus-circle" size={72} color="#007bff" style={styles.addIcon} />
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.itemContainer}>
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.itemsSection}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../images/empty_cart.png')} // Adjust the path to the image file if necessary
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No items added</Text>
        </View>
      ) : (
        <ScrollView style={styles.itemsList}>
          {items.sort((a, b) => b.id - a.id).map((item) => {
            const originalPrice = item.price;
            const discountValue = item.isPercentage && item.discount > 0
              ? (item.price * item.discount) / 100
              : item.discount > 0
              ? item.discount
              : 0;
            const discountedPrice = originalPrice - discountValue;

            return (
              <View key={item.id.toString()} style={styles.itemRow}>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDetailText}>
                    {item.quantity} {item.uom} x{' '}
                    {discountValue > 0 ? (
                      <>
                        <Text style={styles.originalPrice}>
                          {originalPrice.toLocaleString()}
                        </Text>
                        <Text> x </Text>
                        <Text style={styles.discountedPrice}>
                          {discountedPrice.toLocaleString()}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.discountedPrice}>
                        {originalPrice.toLocaleString()}
                      </Text>
                    )}
                  </Text>
                  {discountValue > 0 && (
                    <Text style={styles.discountText}>
                      {item.isPercentage
                        ? `(${item.discount}% off)`
                        : `(-${discountValue.toLocaleString()} off)`}
                    </Text>
                  )}
                </View>
                <Text style={styles.itemTotalText}>
                  <Text style={styles.currencyText}>Rs. </Text>
                  <Text style={styles.amountText}>
                    {(item.quantity * discountedPrice).toLocaleString()}
                  </Text>
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  </ScrollView>


        {/* Remarks input field and image upload button */}
        <View style={styles.remarksContainer}>
          <TextInput
            style={styles.remarksInput}
            placeholder="Enter remarks here"
            multiline
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Image
              source={{ uri: 'https://your-image-url.com/upload-icon.png' }} // Replace with your image URL
              style={styles.uploadImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary Section */}
      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryText}>{total.toLocaleString()}</Text>
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
          <Icon name="dollar" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Receive Amount"
            value={discount}
            keyboardType="numeric"
            onChangeText={setDiscount}
          />
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Final Amount</Text>
          <Text style={styles.summaryText}>{(total - (parseFloat(discount) || 0)).toLocaleString()}</Text>
        </View>
      </View>

      {/* Save Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveAndPrintButton} onPress={handleSave}>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderColor: 'red', // Debug border color
    borderWidth: 1, // Debug border width
    backgroundColor: 'transparent',
  },
  addCustomerButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through', // Strikethrough for original price
    color: 'gray',
    fontSize: 12,
  },
  discountText: {
    color: 'red', // Highlight discount in red
    fontSize: 12,
  },
  discountedPrice: {
    color: 'green', // Highlight final price in green
    fontSize: 12,
  },
  itemTotalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#EAF1FF', // Light background color for the total amount section
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
  currencyText: {
    fontSize: 12,
    fontWeight: 'normal', // Light weight for "Rs."
    color: '#9E9E9E', // Light color for currency text
  },
  
  amountText: {
    fontSize: 12,
    fontWeight: 'bold', // Bold weight for the amount
    color: '#000', // Color for the amount
  },
  
  container: {
    flexGrow: 1,
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
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14, // Consistent font size
  },
  icon: {
    marginHorizontal: 10,
  },
  section: {
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: 'transparent', // No background color
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  addIcon: {
    marginRight: 10,
    fontSize: 30, // Increase the icon size
  },
  buttonText: {
    color: '#000',
    fontSize: 14, // Consistent font size
    marginLeft: 8,
  },
  itemContainer: {
    flex: 1,
    marginBottom: 20,
  },
  itemsSection: {
    flex: 1,
  },
  itemsList: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  emptyImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F7F8FC', // Light background color for each item row
    borderBottomWidth: 1,
    borderBottomColor: '#E0E4F2', // Slightly darker, appealing border color
    borderRadius: 8,
    marginBottom: 10,
  },
  
  itemTextContainer: {
    flex: 3,
  },
  itemName: {
    
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Convert text to uppercase
    
  },
  itemDetailText: {
    fontSize: 12,
    paddingTop:5,
    color: '#666',
  },
  
  remarksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  remarksInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E4F2',
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // Consistent font size
    height: 80,
  },
  uploadButton: {
    marginLeft: 10,
  },
  uploadImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  summarySection: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryText: {
    fontSize: 14,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal:2
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical:5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveAndPrintButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveAndNewButton: {
    backgroundColor: '#17a2b8',
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveIcon: {
    marginRight: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14, // Consistent font size
  },
});

export default CreateInvoice;
