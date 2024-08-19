import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddItemScreen = ({ navigation, route }) => {
  const { addItemToList = () => {} } = route.params || {};

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [isPercentage, setIsPercentage] = useState(true);
  const [uom, setUOM] = useState('');
  const [uomOptions] = useState(['kg', 'liters', 'pieces', 'packs']);
  const [filteredUOMOptions, setFilteredUOMOptions] = useState(uomOptions);
  const [uomVisible, setUOMVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSave = () => {
    if (
      productName.trim() === '' ||
      isNaN(quantity) ||
      isNaN(price) ||
      quantity <= 0 ||
      price <= 0 ||
      uom.trim() === ''
    ) {
      Alert.alert('Invalid Input', 'Please enter valid product details and select a UOM.');
      return;
    }

    let discountAmount = parseFloat(discount);
    if (isPercentage && discountAmount > 0) {
      discountAmount = (discountAmount / 100) * parseFloat(price);
    }

    addItemToList({
      name: productName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      discount: discountAmount,
      uom,
    });
    navigation.goBack();
  };

  const handleSaveAndNew = () => {
    if (
      productName.trim() === '' ||
      isNaN(quantity) ||
      isNaN(price) ||
      quantity <= 0 ||
      price <= 0 ||
      uom.trim() === ''
    ) {
      Alert.alert('Invalid Input', 'Please enter valid product details and select a UOM.');
      return;
    }

    let discountAmount = parseFloat(discount);
    if (isPercentage && discountAmount > 0) {
      discountAmount = (discountAmount / 100) * parseFloat(price);
    }

    addItemToList({
      name: productName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      discount: discountAmount,
      uom,
    });

    setProductName('');
    setQuantity('');
    setPrice('');
    setDiscount('');
    setUOM('');
    setSearchText('');
    setFilteredUOMOptions(uomOptions);
  };

  const filterUOMOptions = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = uomOptions.filter(option =>
        option.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUOMOptions(filtered);
    } else {
      setFilteredUOMOptions(uomOptions);
    }
  };

  const renderUOMOption = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setUOM(item);
        setUOMVisible(false);
        setSearchText('');
      }}
      style={styles.uomOptionContainer}
    >
      <Text style={styles.uomOption}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setUOMVisible(!uomVisible)}
      >
        <Text style={styles.inputText}>{uom || 'Select UOM'}</Text>
      </TouchableOpacity>

      {uomVisible && (
        <FlatList
          data={filteredUOMOptions}
          renderItem={renderUOMOption}
          keyExtractor={(item) => item}
          style={styles.uomList}
        />
      )}

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Discount in {isPercentage ? 'Percentage' : 'Value'}:</Text>
        <Switch
          value={isPercentage}
          onValueChange={setIsPercentage}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={isPercentage ? 'Discount (%)' : 'Discount Value'}
        value={discount}
        keyboardType="numeric"
        onChangeText={setDiscount}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon name="save" size={16} color="#fff" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveAndNewButton} onPress={handleSaveAndNew}>
          <Icon name="plus" size={16} color="#fff" />
          <Text style={styles.buttonText}>Save & New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  uomList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  uomOptionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  uomOption: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleLabel: {
    flex: 1,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  saveAndNewButton: {
    backgroundColor: '#25D366',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default AddItemScreen;
