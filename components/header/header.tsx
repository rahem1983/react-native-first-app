import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
    ScrollView
} from 'react-native';

import {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/Fontisto';
import SearchIcon from 'react-native-vector-icons/Fontisto';
import IconAnt from 'react-native-vector-icons/MaterialCommunityIcons'




const Header = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [chosenDate, setChosenDate] = useState('');
    const [cardData, setCardData] = useState<any>([]);


    const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);


    const onChange = (event: DateTimePickerEvent) => {
        const currentDate = new Date(event.nativeEvent.timestamp);
        setChosenDate(currentDate.toLocaleDateString());
    };

    const searchNote = () => { }
    const showDatepicker = () => { 
        DateTimePickerAndroid.open({
            value: new Date(),
            onChange,
            mode: 'date',
            is24Hour: true,
        });
    };

    const fetchNotes = async () => {
        try {
            const response = await fetch('http://10.11.200.109:3050/notes');
            const data = await response.json();
            if (response.ok) {

                setCardData(data)

            } else {
                throw new Error(`Error fetching notes: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const deleteNote = async (noteId: any) => {
        try {
            const response = await fetch(`http://10.11.200.109:3050/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json' // Optional, but consistent with curl
                }
            });

            if (response.ok) {
                console.log('Note deleted successfully!');
                // Perform actions for successful deletion (e.g., update UI)
            } else {
                throw new Error(`Error deleting note: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
            // Handle error appropriately (e.g., display error message)
        }
    }

    return (
        <View style={styles.header}>
            <Text style={styles.title}>  Note</Text>

            <SearchIcon
                name='search'
                onPress={toggleDropdown}
                size={25}
                color="gray"
                style={styles.searchButton} />

            <Modal visible={isDropdownVisible} animationType="slide" onRequestClose={toggleDropdown}>
                <View style={styles.dropdownContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.dateInput}
                            placeholder="mm/dd/yyyy"
                            placeholderTextColor="#76B1E9"
                            value={chosenDate}
                        // onChangeText={setChosenDate}
                        />
                        <Icon
                            name="date"
                            onPress={showDatepicker}
                            size={42}
                            color="gray"
                            style={{ color: '#3498db', marginTop: 6 }}
                        />

                    </View>
                    <TextInput
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder=" Title"
                        placeholderTextColor="#76B1E9"
                    />
                    <TouchableOpacity style={styles.createButton} onPress={fetchNotes}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                    <View style={styles.cardsContainer}>
                        <ScrollView style={{ marginBottom: 320 }}>
                            {cardData.map((cards: any) => (

                                <View key={cards.id} style={[styles.card, { flexDirection: 'row', }]}>
                                    <View>
                                        <Text style={styles.cardHeader}>{cards.title}</Text>
                                        <Text style={{color:'#666'}}>Date: {cards.createdAt.slice(0, 10)}</Text>
                                        <Text style={styles.description}>{cards.desc}</Text>
                                    </View>
                                    <View style={styles.deleteBtn}>
                                        <Text >
                                            <IconAnt
                                                style={{ color: '#FF7E7E' }}
                                                name='delete-circle-outline'
                                                size={40}
                                                onPress={() => deleteNote(cards.id)} />
                                        </Text>
                                    </View>

                                </View>


                            ))}
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#3498db', // Adjust to your desired color
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchButton: {
        padding: 10,
        borderRadius: 4,
        // backgroundColor: '#94bae0', // Adjust to your desired color
        marginRight: 8,
        color: '#285078',
        //  marginTop: 6 
    },
    searchIcon: {
        fontSize: 24,
        color: '#fff',
    },
    dropdownContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 16,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    dateInput: {
        color: 'black',

        height: 40,
        width: '85%',
        borderRadius: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff', // White background for input
        marginTop: 10,
        fontSize: 17,
        borderColor: '#eee', // Light border for subtle separation
        borderWidth: 1,
        marginRight: 10,
    },
    input: {
        color: 'black',
        fontSize: 17,
        padding: 8,
        borderRadius: 4,
        borderColor: '#eee',
        borderWidth: 1,
        marginBottom: 16,
        marginTop: 10,
    },
    datePicker: {
        // Date picker styles (margin, padding, etc.)
    },
    createButton: {
        height: 40,
        width: '100%',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginTop: 10,
        backgroundColor: '#3498db', // Blue primary color
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff', // White text for visibility
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardsContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    card: {
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#E0E9F1', // White background for cards
        padding: 15,
        shadowColor: '#ccc', // Subtle shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // color:"#586573"
      },
      cardHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#666"
      },
      description: {
        fontSize: 14,
        color: '#666',
        width:200 // Light gray for less important content
      },
    deleteBtn: {
        display: 'flex',
        marginLeft: 120,
        marginTop: 15,
    },
});

export default Header;
