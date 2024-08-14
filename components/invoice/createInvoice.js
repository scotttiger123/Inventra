import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import globalStyles from '../globalStyles'; // Adjust the path based on the folder structure
import CustomButton from '../CustomButton'; // Adjust the path based on the folder structure
import CustomCard from '../CustomCard'; // Adjust the path based on the folder structure
import CustomInput from '../CustomInput'; // Adjust the path based on the folder structure
import AccentText from '../AccentText'; // Adjust the path based on the folder structure
import db from '../DataBase'; //

const CreateInvoice = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tempItems, setTempItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetchTempItems(); // Fetch items from temp_order_item when component mounts
    fetchOrderItems(); // Fetch items from order_item when component mounts
  }, []);

  const addItem = () => {
    if (itemName && quantity) {
      console.log(`Inserting item with values: {"itemName": "${itemName}", "quantity": "${quantity}"}`);
      
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO temp_order_item (product_id, quantity) VALUES (?, ?)`,
          [itemName, quantity],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('Item added successfully');
              setTimeout(() => {
                fetchTempItems(); // Fetch items from temp_order_item after a short delay
              }, 500);
            } else {
              console.error('No rows were affected by the insert operation.');
            }
          },
          (tx, error) => {
            console.error('Insert error:', error.message || error);
            console.error('Error details:', error);
          }
        );
      });
    } else {
      console.error('Item name and quantity are required');
    }
  };

  const fetchTempItems = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM temp_order_item`,
        [],
        (tx, results) => {
          try {
            if (results && results.rows && results.rows.length >= 0) {
              const rows = [];
              for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
              }
              console.log('Fetched temp items:', rows);
              setTempItems(rows);
            } else {
              console.error('Unexpected results format:', results);
              setTempItems([]);
            }
          } catch (error) {
            console.error('Error processing results:', error.message || error);
            setTempItems([]);
          }
        },
        (tx, error) => {
          console.error('Query error:', error.message || error);
          setTempItems([]);
        }
      );
    });
  };

  const fetchOrderItems = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM order_item`,
        [],
        (tx, results) => {
          try {
            if (results && results.rows && results.rows.length >= 0) {
              const rows = [];
              for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
              }
              console.log('Fetched order items:', rows);
              setOrderItems(rows);
            } else {
              console.error('Unexpected results format:', results);
              setOrderItems([]);
            }
          } catch (error) {
            console.error('Error processing results:', error.message || error);
            setOrderItems([]);
          }
        },
        (tx, error) => {
          console.error('Query error:', error.message || error);
          setOrderItems([]);
        }
      );
    });
  };

  const saveData = () => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO order_item (product_id, quantity)
          SELECT product_id, quantity FROM temp_order_item`,
        [],
        (tx, results) => {
          console.log('Data copied to "order_item" table');
          // Clear temp_order_item table after copying data
          tx.executeSql(
            `DELETE FROM temp_order_item`,
            [],
            () => {
              console.log('temp_order_item table cleared');
              fetchTempItems(); // Refresh the temp items
              fetchOrderItems(); // Refresh the order items
            },
            (tx, error) => {
              console.error('Error clearing temp_order_item table:', error.message || error);
            }
          );
        },
        (tx, error) => {
          console.error('Error copying data to "order_item" table:', error.message || error);
        }
      );
    });
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerText}>Inventory Control</Text>
      </View>
      <ScrollView>
        <CustomInput
          placeholder="Enter item name"
          value={itemName}
          onChangeText={setItemName}
        />
        <CustomInput
          placeholder="Enter quantity"
          value={quantity}
          keyboardType="numeric"
          onChangeText={setQuantity}
        />
        <CustomButton title="Add Item" onPress={addItem} />
        <CustomButton title="Save to Order" onPress={saveData} />
        
        <Text style={globalStyles.sectionTitle}>Temporary Items</Text>
        {tempItems.length > 0 ? (
          tempItems.map(item => (
            <CustomCard
              key={item.order_item_id}
              title={item.product_id}
              content={`Quantity: ${item.quantity}`}
            />
          ))
        ) : (
          <Text>No items in temp_order_item</Text>
        )}

        <Text style={globalStyles.sectionTitle}>Order Items</Text>
        {orderItems.length > 0 ? (
          orderItems.map(item => (
            <CustomCard
              key={item.order_item_id}
              title={item.product_id}
              content={`Quantity: ${item.quantity}`}
            />
          ))
        ) : (
          <Text>No items in order_item</Text>
        )}

        <AccentText style={{ fontSize: 16 }}>Highlighted Text</AccentText>
      </ScrollView>
    </View>
  );
};

export default CreateInvoice;
