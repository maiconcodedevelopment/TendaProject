import React from "react"
import { View , Picker , FlatList , FlatListProperties , FlatListProps , FlexAlignType , StyleSheet } from "react-native";
import { connect } from "react-redux";

import ContainerLayout from "../../components/containerLayout";
import { width } from "../../styles";

class TransactionList extends React.Component{

    render(){
        return(
            <ContainerLayout
              style={styles.container}
            >

            </ContainerLayout>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : width
    }
})

let mapStateProps = state => ({ user : state.user })

export default connect(mapStateProps)(TransactionList)