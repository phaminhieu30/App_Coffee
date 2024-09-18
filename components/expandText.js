import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants';

const ExpandableText = ({ text, maxLength = 100 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const displayText = isExpanded ? text : text.substring(0, maxLength) + '...';

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{displayText}</Text>
            <TouchableOpacity onPress={toggleIsExpanded}>
                <Text style={styles.buttonText}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    text: {
        fontSize: 17,
        fontWeight: '500',
    },
    buttonText: {
        color: colors.third,
        fontSize: 15,
        marginTop: 5
    }
});

export default ExpandableText;
