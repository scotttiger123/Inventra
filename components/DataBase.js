import SQLite from 'react-native-sqlite-storage';  // Adjust this import if using expo-sqlite

const db = SQLite.openDatabase(
  { name: 'myDatabase.db', location: 'default' },
  () => console.log('Database opened successfully'),
  error => {
    console.error('Database opening error:', error);
  }
);

// Function to create the 'items' table
const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS items (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        quantity INTEGER NOT NULL
      )`,
      [],
      () => console.log('Table "items" created successfully'),
      (tx, error) => console.error('Table "items" creation error:', error)
    );
  });
};

const dropTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `DROP TABLE IF EXISTS temp_order_item`,
      [],
      () => {
        console.log('Table "temp_order_item" dropped successfully');
        // Proceed to drop the next table
        tx.executeSql(
          `DROP TABLE IF EXISTS order_item`,
          [],
          () => {
            console.log('Table "order_item" dropped successfully');
            // Proceed to drop the next table
            tx.executeSql(
              `DROP TABLE IF EXISTS orders`,
              [],
              () => {
                console.log('Table "orders" dropped successfully');
                // Recreate the temp_order_item table after dropping all tables
                createTempOrderItem();
              },
              (tx, error) => {
                console.error('Table "orders" drop error:', error.message || error);
              }
            );
          },
          (tx, error) => {
            console.error('Table "order_item" drop error:', error.message || error);
          }
        );
      },
      (tx, error) => {
        console.error('Table "temp_order_item" drop error:', error.message || error);
      }
    );
  });
};

// Example usage
dropTables();

// Function to create the 'temp_order_item' table
const createTempOrderItem = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS temp_order_item (
        order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT DEFAULT NULL,
        product_name TEXT DEFAULT NULL,
        quantity TEXT DEFAULT NULL,
        qty_in_a_cartoon INTEGER DEFAULT NULL,
        Sq_Rft REAL DEFAULT NULL,
        rate TEXT DEFAULT NULL,
        purchase_rate TEXT DEFAULT NULL,
        profit REAL DEFAULT NULL,
        Disc TEXT DEFAULT NULL,
        total TEXT DEFAULT NULL,
        user INTEGER NOT NULL DEFAULT 0,
        client_name TEXT DEFAULT NULL,
        client_id TEXT DEFAULT NULL,
        room_sj TEXT DEFAULT NULL,
        uom_sj TEXT DEFAULT NULL,
        net_rate_sj TEXT DEFAULT NULL,
        order_id_manual TEXT DEFAULT NULL,
        unitdiscription TEXT DEFAULT NULL,
        TaxOnAmount TEXT DEFAULT NULL,
        branch INTEGER DEFAULT NULL,
        category TEXT DEFAULT NULL
        
      )`,
      [],
      () => console.log('Table "temp_order_item" created successfully'),
      (tx, error) => console.error('Table "temp_order_item" creation error:', error.message || error)
    );
  });
};



// Function to create the 'order_item' table
const createOrderItem = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS order_item (
        order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT DEFAULT NULL,
        product_name TEXT DEFAULT NULL,
        quantity TEXT DEFAULT NULL,
        qty_in_a_cartoon INTEGER DEFAULT NULL,
        Sq_Rft REAL DEFAULT NULL,
        rate TEXT DEFAULT NULL,
        purchase_rate TEXT DEFAULT NULL,
        profit REAL DEFAULT NULL,
        Disc TEXT DEFAULT NULL,
        total TEXT DEFAULT NULL,
        user INTEGER NOT NULL DEFAULT 0,
        client_name TEXT DEFAULT NULL,
        client_id TEXT DEFAULT NULL,
        room_sj TEXT DEFAULT NULL,
        uom_sj TEXT DEFAULT NULL,
        net_rate_sj TEXT DEFAULT NULL,
        order_id_manual TEXT DEFAULT NULL,
        unitdiscription TEXT DEFAULT NULL,
        TaxOnAmount TEXT DEFAULT NULL,
        branch INTEGER DEFAULT NULL,
        category TEXT DEFAULT NULL
      )`,
      [],
      () => console.log('Table "order_item" created successfully'),
      (tx, error) => console.error('Table "order_item" creation error:', error)
    );
  });
};

// Function to create the 'orders' table
const createOrders = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_date INTEGER NOT NULL,
        client_name TEXT DEFAULT NULL,
        client_id TEXT DEFAULT NULL,
        client_contact TEXT DEFAULT NULL,
        sub_total TEXT DEFAULT NULL,
        vat TEXT DEFAULT NULL,
        total_amount TEXT DEFAULT NULL,
        grand_total TEXT DEFAULT NULL,
        discount TEXT DEFAULT NULL,
        discount_percentage TEXT DEFAULT NULL,
        other_charges TEXT DEFAULT NULL,
        net_amount REAL DEFAULT NULL,
        paid TEXT DEFAULT NULL,
        due INTEGER DEFAULT NULL,
        payment_type REAL DEFAULT NULL,
        payment_status TEXT DEFAULT NULL,
        order_status TEXT NOT NULL DEFAULT '0',
        g_profit TEXT DEFAULT NULL,
        paying TEXT DEFAULT NULL,
        sales_man TEXT DEFAULT NULL,
        manual_date TEXT DEFAULT NULL,
        order_id_manual TEXT DEFAULT '0',
        OrderQuot TEXT DEFAULT NULL,
        ShareSalePartner1 TEXT DEFAULT NULL,
        ShareSalePartner2 TEXT DEFAULT NULL,
        ShareSalePartner3 TEXT DEFAULT NULL,
        date TEXT DEFAULT NULL,
        user TEXT DEFAULT NULL,
        stock_out_from_wh INTEGER DEFAULT NULL,
        branch INTEGER DEFAULT NULL,
        sr INTEGER NOT NULL,
        direct_discount_id TEXT DEFAULT NULL,
        stock_out_remarks TEXT DEFAULT NULL,
        bill_remarks TEXT DEFAULT NULL,
        address TEXT DEFAULT NULL
      )`,
      [],
      () => console.log('Table "orders" created successfully'),
      (tx, error) => console.error('Table "orders" creation error:', error)
    );
  });
};

// Call functions to ensure tables are created
createTables();
createTempOrderItem();
createOrderItem();
createOrders();

export default db;
