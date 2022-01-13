import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ForYouCell from './ForYouCell';

const Explore = () => {
    const [searchQuery, setsearchQuery] = React.useState('');

    const onChangeSearchText = (query: string) => {
        setsearchQuery(query);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore</Text>
            <ForYouCell name="Taqueria Santa Cruz" businessId='asdfa' distance={3} />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
    },
    container: {
        margin: 50,
        height: "100%",
    }
});

export default Explore;