import React from 'react';
import { StyleSheet, Text, View, Slider, Button } from 'react-native';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>

      <View style={{width:"100%"}}>
      <Text style={styles.my_font, styles.card_header_text}>inter_treatment_interval Weeks Between Treatments</Text>
        <Slider step={1} minimumValue={1} maximumValue={4} value={2}
          onSlidingComplete={(value) => console.log("change inter_treatment_interval state to ", value)}
              />
<Text style={styles.my_font, styles.card_header_text}>treatment_num Treatments</Text>
        <Slider step={1} minimumValue={1} maximumValue={20} value={12}
          onSlidingComplete={(value) => console.log("change tx_num state to ", value)}
              />
              <Button
                onPress={() => (console.log('set show_tx_setup to false'))}
                title="Submit"
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
