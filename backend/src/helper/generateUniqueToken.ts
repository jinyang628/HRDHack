export default function generateUniqueToken(username: string) {
    // Get the current date
    const date = new Date();

    // Format the date as 'YYYYMMDD'
    const formattedDate = date.getFullYear().toString() + 
                          (date.getMonth() + 1).toString().padStart(2, '0') + 
                          date.getDate().toString().padStart(2, '0');

    // Concatenate the formatted date with the username
    const token = formattedDate + '_' + username;

    return token;
}
