import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View, Slider, Button, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { addNavigationHelpers } from 'react-navigation';

import {connect, Provider} from 'react-redux';
import {createStore, dispatch} from 'redux';
import PropTypes from 'prop-types'


SET_PAGE_VIEW = 'SET_PAGE_VIEW'
SET_NUM_TREATMENTS = "SET_NUM_TREATMENTS"
SET_INTER_TREATMENT_INTERVAL = "SET_INTER_TREATMENT_INTERVAL"
SET_TREATMENT_START_DATE = "SET_TREATMENT_START_DATE"

//action
function set_page(page) {
  return {
    type: SET_PAGE_VIEW,
    page_of_interest: page
  }
}

//action
function set_num_treatments(num) {
  return {
    type: SET_NUM_TREATMENTS,
    num: num
  }
}

//action
function set_inter_treatment_interval(num_weeks) {
  return {
    type: SET_INTER_TREATMENT_INTERVAL,
    weeks_between_treatments: num_weeks
  }
}

function set_treatment_start_date(date){
  return {
    type: SET_TREATMENT_START_DATE,
    date: date
  }
}


const initialState = {
  current_page: "overview",
  num_treatments: 12,
  inter_treatment_interval: 2,
}
function main_reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE_VIEW:
      return Object.assign({}, state, {
        current_page: action.page_of_interest
      })
    case SET_NUM_TREATMENTS:
      return Object.assign({}, state, {
        num_treatments: action.num
      })
    case SET_INTER_TREATMENT_INTERVAL:
      return Object.assign({}, state, {
        inter_treatment_interval: action.weeks_between_treatments
      })
    case SET_TREATMENT_START_DATE:
      return Object.assign({}, state, {
        treatment_start_date: action.date
      })
    default:
      return state
  }
  return state
}


let store = createStore(main_reducer);



store.getState();
store.subscribe(() =>
  console.log(store.getState())
);






class TreatmentStartDatePicker extends React.Component {
  componentDidMount() {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(() =>
    this.forceUpdate()
  );
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  render(){
    const props = this.props
    const {store} = props
    const state = store.getState()
    return (
      <DatePicker
        style={{width: '100%'}}
        date={state.treatment_start_date}
        mode="date"
        placeholder="Select your next treatment date"
        format="dddd, MMMM DD, YYYY"
        minDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            marginLeft: 0
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => store.dispatch(set_treatment_start_date(date))}

      />
    )
  }
}


class HeaderNavigatorButtons extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <View style={styles.navbar_button_container}>

      <Button
        onPress={() => store.dispatch(set_page("overview"))}
        title="OVERVIEW"
        color="black"
        accessibilityLabel="OVERVIEW"
      />
      <Button
        onPress={() => store.dispatch(set_page("data"))}
        title="DATA"
        color="grey"
        accessibilityLabel="DATA"
      />
      <Button
        onPress={() => store.dispatch(set_page("settings"))}
        title="SETTINGS"
        color="grey"
        accessibilityLabel="SETTINGS"
      />
      </View>
    )
  }
}

class TreatmentSettings extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const props = this.props
    const {store} = props
    const state = store.getState()
    return(
      <View style={styles.treatment_option_slider_card}>
      <Text style={styles.my_font, styles.tx_settings_header}>{state.num_treatments} Treatments</Text>
      <Slider step={1} minimumValue={1} maximumValue={20} value={12}
              onValueChange={(num_treatments) => {store.dispatch(set_num_treatments(num_treatments))}}  />
      <Text style={styles.my_font, styles.tx_settings_header}>X Weeks Between Treatments</Text>
      <Slider step={1} minimumValue={1} maximumValue={4} value={2} style={{marginBottom:60}}
                    onValueChange={(value) => {store.dispatch(set_inter_treatment_interval(value))}}
                    />
      <TreatmentStartDatePicker store={store}/>

      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={createStore(main_reducer)}>
        <AppContainer />
      </Provider>
    );
  }
}

class AppContainer extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(

          <View style={styles.container}>
            <HeaderNavigatorButtons />
            <TreatmentSettings store={store} />
            <Text>{store.num_treatments}</Text>
          </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatment_option_slider_card: {
    width:'100%',
    flex:9,
    padding:30,
    marginLeft: 20,
    marginRight:20,
    backgroundColor: 'lightgrey',
  },
  my_font: {
    fontFamily: 'System',
  },
  normal_body_text: {
    fontSize: 9,
  },
  card_header_text: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  tx_settings_header: {
    fontSize: 30,
    marginBottom: 30,
    marginTop: 50,
  },
  navbar_text: {
    fontSize: 14,
    fontWeight:'200',
    width: 100,
    marginLeft:0,
    marginRight:0,
    paddingRight:0,
    paddingLeft:0,

  },
  navbar_button_container: {
    flex:1,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});
