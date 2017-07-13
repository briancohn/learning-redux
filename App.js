import React from 'react';
import { StyleSheet, Text, View, Slider, Button, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { addNavigationHelpers } from 'react-navigation';

function upsert_slider_val(value) {
    console.log(this.state)
    this.setState(...this.state, {inter_treatment_interval_ui: value })
}





class TreatmentStartDatePicker extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <DatePicker
        style={{width: '100%', marginTop: 50, marginBottom: 60}}
        // date={this.state.date}
        mode="date"
        placeholder="Select your first treatment date"
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
        onDateChange={(date) => {
          console.log('run child handler for ', date);
          this.props.handler(date);
          // this.props.render();
        }}
      />
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //instantiate the state for the UI vals
    let rightNow = new Date()
    this.state = {inter_treatment_interval_ui: 2,  treatment_num_ui: 12, treatment_start_date: rightNow};
    this.handler = this.handler.bind(this)
  }
  handler(date) {
    console.log('handler run with ', date)
    this.setState(...this.state, {date: date})
  }
  render() {
    return (
      <View style={styles.container}>

      <View style={styles.treatment_option_slider_card}>
      <Text style={styles.my_font, styles.tx_settings_header}>{this.state.treatment_num_ui} Treatments</Text>
              <Slider step={1} minimumValue={1} maximumValue={20} value={12}
              onValueChange={(value) => {
                this.setState(...this.state, {treatment_num_ui: value })
            }}
                    />
                    <Text style={styles.my_font, styles.tx_settings_header}>{this.state.inter_treatment_interval_ui} Weeks Between Treatments</Text>
                    <Slider step={1} minimumValue={1} maximumValue={4} value={2}
                    onValueChange={(value) => {
                      this.setState(...this.state, {inter_treatment_interval_ui: value })
                    }}
                    />
                    <TreatmentStartDatePicker handler={this.handler}/>
                    <Button
                      onPress={() => (console.log(this.state,"dispatch(hideTreatmentSettings(this.state.inter_treatment_interval_ui, this.state.treatment_num_ui))"))}
                      title="Done"
                      color="#333"
                    />
      </View>

          <Text style={styles.my_font, styles.card_header_text}>NEXT TREATMENT DATE</Text>
              <Text style={styles.my_font}>Friday April 19, 2017</Text>
              <Text style={styles.my_font, styles.normal_body_text}>You have 10 treatments remaining.</Text>

              <Text style={styles.my_font, styles.card_header_text}>FORECAST</Text>
              <Text style={styles.my_font, styles.normal_body_text}>You are likely to feel lethargic all day. You may experience nausea.</Text>



              <Text style={styles.my_font, styles.card_header_text}>LATER THIS WEEK</Text>
              <Text style={styles.my_font, styles.normal_body_text}>Vomiting and nausea for two more days, expected to feel near-normal on Tuesday</Text>
              <View style={{flexDirection: 'row', margin:20}}>
              <Text style={styles.my_font,{flex:1, width:20, fontSize: 8}}>FATIGUE</Text>
              <Text style={styles.my_font,{flex:1, width:20, fontSize: 8}}>NAUSEA</Text>
              <Text style={styles.my_font,{flex:1, width:20, fontSize: 8}}>PAIN</Text>
              <Text style={styles.my_font,{flex:1, width:20, fontSize: 8}}>NEUROPATHY</Text>
              </View>

            </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatment_option_slider_card: {
    width:'100%',
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
  }
});
