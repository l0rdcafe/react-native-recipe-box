import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Card, Text, Icon } from "react-native-elements";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold"
  },
  item: {
    marginBottom: 4,
    flexDirection: "row"
  },
  itemText: {
    marginLeft: 5,
    fontSize: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

const RecipeView = ({ recipe, handleDelete, toggleModal }) => {
  if (recipe.recipe) {
    return (
      <Card title={recipe.recipe.replace(/-/g, " ").toUpperCase()}>
        {recipe.recipe !== "No Recipe Found" && (
          <View style={styles.row}>
            <Icon name="edit" onPress={() => toggleModal(true, "edit")} />
            <Icon name="delete" onPress={() => handleDelete(recipe.recipe)} />
          </View>
        )}
        <Text style={styles.header}>Ingredients</Text>
        <FlatList
          keyExtractor={item => item}
          data={recipe.ingredients}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Icon name="circle" type="font-awesome" size={12} />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
        />
        <Text style={[styles.header, { marginTop: 10 }]}>Directions</Text>
        <FlatList
          keyExtractor={item => item}
          data={recipe.directions}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Icon name="circle" type="font-awesome" size={12} />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
        />
      </Card>
    );
  }
  return <ActivityIndicator />;
};

RecipeView.propTypes = {
  recipe: PropTypes.shape({
    recipe: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    directions: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default RecipeView;
