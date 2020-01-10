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
      nutriscore_table: {
        tableHead: [],
        tableData: []
      },
      nutriments_table: {
        tableTitle: ['1', '2'],
        tableData: [
          'a',
          'b'
        ]
      }
    };
  }

  componentDidMount(){
    this.setState({
      nutriscore_table:{
        tableHead: ['energy', 'fibers', 'fruit part', 'proteins', 'sat. fats', 'sodium', 'sugar'],
        tableData: [
          this.props.navigation.state.params.item.nutriscore_data.energy,
          this.props.navigation.state.params.item.nutriscore_data.fiber,
          this.props.navigation.state.params.item.nutriscore_data.fruits_vegetables_nuts_colza_walnut_olive_oils,
          String(this.props.navigation.state.params.item.nutriscore_data.proteins).substring(0, 10),
          String(this.props.navigation.state.params.item.nutriscore_data.saturated_fat).substring(0, 10),
          this.props.navigation.state.params.item.nutriscore_data.energy,
          this.props.navigation.state.params.item.nutriscore_data.energy
        ]
      }
    })
  }
  render() {
    const state = this.state
    const item = this.props.navigation.state.params;
    //console.log(typeof(item.item.nutriscore_data.proteins))
    console.log(typeof(item.item.nutriscore_data.proteins))
    let string_debug = state.nutriscore_table.tableData[3]

    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 20, fontFamily: 'Roboto' }}>

        <ScrollView style={styles.scroll_view}>
        <Text>{string_debug}</Text>
          <View style={styles.details_top}>
            <Image
              source={{
                uri: item.item.image_small_url
              }}
              style={styles.product_img}
            />

            <View style={styles.details_header}>
              <Text style={styles.product_name}>{item.product_name}</Text>
              <Text style={styles.product_code}>{'| ||| ' + item.item.code + ' ||| ||'}</Text>
            </View>
          </View>

          <View style={styles.details_main}>
            <Text style={{color: '#555'}}>{'MARQUE : ' + item.item.brands + '\n'}</Text>
            <Text style={{color: '#555'}}>{item.item.ingredients_text_fr}</Text>

              <View style={{alignSelf: 'center', marginTop: 15}}>
                <Image
                  source={{
                    uri: 'https://static.openfoodfacts.org/images/misc/nutriscore-' + item.item.nutriscore_grade + '.png'
                  }}
                  style={styles.nutriscore}
                />

                <Table style={{margin: 15, alignSelf: 'center', width: 150}} borderStyle={{borderWidth: 1, borderColor: '#bbb'}}>
                  <Row data={state.nutriscore_table.tableHead} textStyle={styles.cells}/>
                  <Row data={state.nutriscore_table.tableData} textStyle={styles.cells}/>
                </Table>

                {/*<Table style={{flexDirection: 'row', margin: 15, alignSelf: 'center', width: '75%'}} borderStyle={{borderWidth: 1, borderColor: '#bbb'}}>
                  <TableWrapper><Col data={state.nutriments_table.tableTitle} textStyle={styles.cells}/></TableWrapper>
                  <TableWrapper style={{flex:1}}><Col data={state.nutriments_table.tableData} textStyle={styles.cells}/></TableWrapper>
                </Table>*/}
              </View>
            <Text style={{color: '#555'}}>{'Ingrédients allergènes : \n' + item.item.allergens_from_ingredients}</Text>
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
    fontSize: 20,
    fontStyle: 'italic' ,
    textAlign: 'center',
    //backgroundColor: 'yellow'
  },
  details_main: {
    //backgroundColor: 'blue',
    marginTop: 10,
  },
  nutriscore: {
    width: 100,
    aspectRatio: 1.8,
    marginLeft: 10
  },
  cells: {
    paddingLeft: 20,
    paddingRight: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#555'
  }
});
