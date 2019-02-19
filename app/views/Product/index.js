import React from "react"
import { View, Text , ScrollView , StyleSheet } from "react-native"
import { IconNode } from "react-native-elements"
import {} from "../../"


export default class Product extends React.Component{

    render(){
        return(
            <View>
                <ScrollView
                  horizontal={true}
                  pagingEnabled={true}
                >
                  <View>

                  </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   cardProductView : {
       flex : 1,
       width
   }
})