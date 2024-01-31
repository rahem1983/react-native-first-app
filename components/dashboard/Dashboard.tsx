import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import IconAnt from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../header/header';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cardData, setCardData] = useState<any>([]);



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

  const postNote = async () => {
    try {
      const response = await fetch('http://10.11.200.109:3050/notes', {
        method: 'POST', // Specify the POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type for JSON
          'Accept': 'application/json', // Accept JSON response
        },
        body: JSON.stringify({
          "title": title,
          "desc": description
        }), // Stringify the body object
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Note created successfully!', data);
        setTitle('')
        setDescription('')
        // Handle successful response, e.g., display a success message or redirect
      } else {
        throw new Error(`Error creating note: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating note:', error);
      // Handle error, e.g., display an error message to the user
    }
  }


  const deleteNote = async (noteId:any) =>  {
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

  useEffect(() => {
    fetchNotes()
  }, [postNote])
  return (
    <>
      <Header/>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.dateInput}
              placeholder="mm/dd/yyyy"
              value={chosenDate}
            // onChangeText={setText}
            />
            <Icon
              name="date"
              onPress={showDatepicker}
              size={42}
              color="gray"
              style={{ color: '#3498db', marginTop: 6 }}

            />
          </View> */}

          <TextInput
            style={styles.input}
            placeholder="Enter Title"
          placeholderTextColor="#76B1E9"
            
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Description"
            placeholderTextColor="#76B1E9"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity style={styles.createButton} onPress={postNote}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <ScrollView style={{ marginBottom: 150 }}>
            {cardData.map((cards: any) => (

              <View key={cards.id} style={[styles.card, {flexDirection: 'row',}]}>
                <View>
                  <Text style={styles.cardHeader}>{cards.title}</Text>
                  <Text style={{color:'#666'}}>Date: {cards.createdAt.slice(0, 10)}</Text>
                  <Text style={styles.description}>{cards.desc}</Text>
                </View>
                <View style={styles.deleteBtn}>
                  <Text >
                    <IconAnt
                      style={{color: '#FF7E7E'}}
                      name='delete-circle-outline'
                      size={40} 
                      onPress={()=>deleteNote(cards.id)}/>
                  </Text>
                </View>

              </View>


            ))}
          </ScrollView>

        </View>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  // dateInput:{
  //   flexDirection: 'row'
  // },
  deleteBtn: {
    display: 'flex', 
    marginLeft: 110,
    marginTop: 15,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light gray background
  },
  inputContainer: {
    alignItems: 'center',
  },
  datePickerButton: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff', // White background for button
    shadowColor: '#ccc', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#333', // Darker text for better contrast
  },
  dateInput: {
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
    color:'black',
    height: 40,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff', // White background for input
    marginTop: 10,
    fontSize: 17,
    borderColor: '#eee', // Light border for subtle separation
    borderWidth: 1,
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
});


export default Dashboard;
