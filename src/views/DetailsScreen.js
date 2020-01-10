import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { Icon } from "native-base";
import { nutriScore } from "nutri-score";
import { Table, TableWrapper, Row, Rows, Col, Cols } from 'react-native-table-component';


export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text>{navigation.getParam("product_name", "product name")}</Text>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("This is a button!")}>
          <Icon name="heart" type="EvilIcons" />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData:
        ['1', '2', '3', '4'
      ],
      nutriments_table: {
        tableHead: [
          'energy \n ('+ this.props.navigation.state.params.item.nutriments.energy_unit +')',
          'proteins \n ('+ this.props.navigation.state.params.item.nutriments.proteins_unit +')',
          'saturated fats \n ('+ this.props.navigation.state.params.item.nutriments["saturated-fat_unit"] +')',
          'salt \n ('+ this.props.navigation.state.params.item.nutriments.salt_unit +')',
          'sugars \n ('+ this.props.navigation.state.params.item.nutriments.sugars_unit +')',
          'carbohydrates \n ('+ this.props.navigation.state.params.item.nutriments.carbohydrates_unit +')',
          'fibers \n (g)',
          'fruit/veggie \n (g)'
        ],
        tableData: [
          String(this.props.navigation.state.params.item.nutriments.energy_value).substring(0, 7),
          String(this.props.navigation.state.params.item.nutriments.proteins).substring(0, 7),
          String(this.props.navigation.state.params.item.nutriments["saturated-fat_value"]).substring(0, 7),
          String(this.props.navigation.state.params.item.nutriments.salt_value).substring(0, 7),
          String(this.props.navigation.state.params.item.nutriments.sugars_value).substring(0, 7),
          String(this.props.navigation.state.params.item.nutriments.carbohydrates_value).substring(0, 7),
          String(this.props.navigation.state.params.item.nutriscore_data.fruits_vegetables_nuts_colza_walnut_olive_oils).substring(0, 7),
          String(this.props.navigation.state.params.item.nutriscore_data.fiber).substring(0, 7)
        ]
      }
    };
  }

  render() {
    const state = this.state
    const item = this.props.navigation.state.params;
    //console.log(typeof(item.item.nutriscore_data.proteins))
    console.log((item.item.code))
    let string_debug = item.item.code

    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 20, fontFamily: 'Roboto' }}>

        <ScrollView style={styles.scroll_view}>
          <View style={styles.details_top}>
            <Image
              source={{
                uri: item.item.image_small_url
              }}
              style={styles.product_img}
            />

            <View style={styles.details_header}>
              <Text style={styles.product_name}>{item.product_name}</Text>
              <Text style={styles.product_code}>{"| ||| " + item.item.code + " ||| ||"}</Text>
            </View>
          </View>

          <View style={styles.details_main}>
            <Text style={styles.info_title}>{'Marque :'}</Text>
            <Text style={styles.info_content}>{item.item.brands}</Text>
            <Text style={styles.info_title}>{'Allergènes :'}</Text>
            <Text style={styles.info_content}>{item.item.allergens_from_ingredients}</Text>

              <View style={{alignSelf: 'center', width: '100%'}}>
                <Text style={styles.info_title}>{"Informations nutritives (pour 100g) :"}</Text>
                <Table style={{flexDirection: 'row', margin: 5, alignSelf: 'center', width: '75%'}} borderStyle={{borderWidth: 1, borderColor: '#bbb'}}>
                  <TableWrapper><Col data={state.nutriments_table.tableHead} textStyle={styles.cells}/></TableWrapper>
                  <TableWrapper style={{flex:1}}><Col data={state.nutriments_table.tableData} textStyle={styles.cells}/></TableWrapper>
                </Table>
                <Image
                  source={{
                    uri: 'https://static.openfoodfacts.org/images/misc/nutriscore-' + item.item.nutriscore_grade + '.png'
                  }}
                  style={styles.nutriscore_img}
                />
              </View>
              <Text style={styles.info_title}>{'Ingrédients :'}</Text>
              <Text style={styles.info_content}>{item.item.ingredients_text_fr}</Text>
            <View style={{height: 200}}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  lineContainer: {
    height: 40,
    padding: 10
  },
  scroll_view: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15
  },
  details_top: {
    width: '100%',
    flexDirection: 'row',
    //backgroundColor: 'orange'
  },
  product_img: {
    width: '35%',
    margin: '3%',
    aspectRatio: 1,
    borderRadius: 15
  },
  details_header: {
    width: '59%',
    margin: '3%',
    marginLeft: 0,
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  product_name: {
    fontSize: 30,
    textAlign: 'center',
    //backgroundColor: 'blue'
  },
  product_code: {
    fontSize: 17,
    textAlign: 'center',
    //backgroundColor: 'yellow'
  },
  details_main: {
    //backgroundColor: 'blue',
    marginTop: 10,
  },
  info_title :{
    fontSize: 18,
    textTransform: 'uppercase',
    marginTop: 20,
    color: '#555'
  },
  info_content: {
    marginLeft: 35,
    color: '#555'
  },
  nutriscore_img: {
    width: 140,
    aspectRatio: 1.8,
    alignSelf: 'center'
  },
  cells: {
    fontSize: 12,
    paddingLeft: 3,
    paddingRight: 3,
    textAlign: 'center',
    color: '#555'
  },
});
