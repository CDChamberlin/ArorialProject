```js
const User: {
  email: {
     type: DataTypes.STRING;
     unique: "email";
  };
  emailVerified: {
     type: DataTypes.DATE;
  };
  id: {
     defaultValue: DataTypes.UUIDV4;
     primaryKey: true;
     type: DataTypes.UUID;
  };
  image: {
     type: DataTypes.STRING;
  };
  name: {
     type: DataTypes.STRING;
  };
  password:{
    allowNull: false;
  };
  discordID: type: DataTypes.STRING;
};
```
