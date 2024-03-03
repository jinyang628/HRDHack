import { getDiscussion } from '@/api/getDiscussion';
import { getUniqueToken } from '@/api/getUniqueToken';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Button, TextInput, Dialog, Paragraph } from 'react-native-paper';

export default function ALS() {
    const GROUP_NAME: string = 'als';
    const [newCardText, setNewCardText] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [editText, setEditText] = useState('');
    const [uniqueToken, setUniqueToken] = useState(''); 
    const [cards, setCards] = useState<Array<{uniqueToken: string, text: string}>>([]); 

    useEffect(() => {
        const fetchDiscussion = async () => {
            try {
                const groupName = GROUP_NAME; 
                const discussionData = await getDiscussion(groupName);

                console.log(discussionData);

                if (discussionData && discussionData.comments) {
                    setCards(discussionData.comments);
                }
            } catch (error) {
                console.error("Error fetching discussion data:", error);
            }
        };

        fetchDiscussion();
    }, []); // Empty dependency array means this effect runs once on mount

    
    const addCard = async () => {
        const uniqueToken = await getUniqueToken();
        console.log(uniqueToken)
        setUniqueToken(uniqueToken);
        setCards([...cards, { text: newCardText, uniqueToken: uniqueToken }]);
        setNewCardText('');
    };

    const deleteCard = (index: number) => {
        const newCards = [...cards];
        newCards.splice(index, 1);
        setCards(newCards);
    };

    const openEditDialog = (index: number) => {
        setEditIndex(index);
        setEditText(cards[index]["text"]);
        setIsDialogVisible(true);
    };

    const handleEditCard = () => {
        const newCards = [...cards];
        newCards[editIndex] = { text: editText, uniqueToken: uniqueToken };
        setCards(newCards);
        closeDialog();
    };

    const closeDialog = () => {
        setIsDialogVisible(false);
        setEditIndex(-1);
        setEditText('');
    };

    return (
        <ScrollView>
        <TextInput
            label="Comment"
            value={newCardText}
            onChangeText={setNewCardText}
            right={<TextInput.Icon icon="plus" onPress={addCard} />}
        />
        {cards.map((card, index) => (
            <Card key={index} style={styles.card}>
                <Card.Content>
                    <Paragraph>{card.text}</Paragraph>
                    <Paragraph style={styles.ownerCard}>{card.uniqueToken.split("_")[1]}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button 
                        onPress={() => deleteCard(index)}
                        disabled={card.uniqueToken !== uniqueToken}> 
                        Delete
                    </Button>
                    <Button 
                        onPress={() => openEditDialog(index)}
                        disabled={card.uniqueToken !== uniqueToken}> 
                        Edit
                    </Button>
                </Card.Actions>
            </Card>
        ))}
        <View>
            <Dialog visible={isDialogVisible} onDismiss={closeDialog}>
            <Dialog.Title>Edit Card</Dialog.Title>
            <Dialog.Content>
                <TextInput
                label="Edit Content"
                value={editText}
                onChangeText={setEditText}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={closeDialog}>Cancel</Button>
                <Button onPress={handleEditCard}>Save</Button>
            </Dialog.Actions>
            </Dialog>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  ownerCard: {
    marginTop: 15,
    color: 'grey', 
    fontStyle: 'italic',
    fontSize: 12, 
  }
});
