import React from 'react';
import { StyleSheet, Text, View, Slider, Button } from 'react-native';


function upsert_slider_val(value) {
    console.log(this.state)
    this.setState(...this.state, {inter_treatment_interval_ui: value })
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //instantiate the state for the UI vals
    let rightNow = new Date()
    this.state = {inter_treatment_interval_ui: 2,  treatment_num_ui: 12, start_date: rightNow};
  }
  render() {
    return (
      <View style={styles.container}>
<View style={styles.treatment_option_slider_card}>
      <Text style={styles.my_font, styles.card_header_text}>{this.state.inter_treatment_interval_ui} Weeks Between Treatments</Text>
        <Slider step={1} minimumValue={1} maximumValue={4} value={2}
          onValueChange={(value) => {
            this.setState(...this.state, {inter_treatment_interval_ui: value })
        }}
        />
<Text style={styles.my_font, styles.card_header_text}>{this.state.treatment_num_ui} Treatments</Text>
        <Slider step={1} minimumValue={1} maximumValue={20} value={12}
        onValueChange={(value) => {
          this.setState(...this.state, {treatment_num_ui: value })
      }}
              />

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatment_option_slider_card: {
    width:'100%',
    marginLeft: 10,
    marginRight:10,
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
  }
});
