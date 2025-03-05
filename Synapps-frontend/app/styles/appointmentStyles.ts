import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#EDE8D0",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  datePicker: {
    backgroundColor: "#F2F2F2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeSlot: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 8,
    margin: 5,
    flex: 1,
    alignItems: "center",
  },
  selectedSlot: {
    backgroundColor: "#EDE8D0",
  },
  timeText: {
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: "#EDE8D0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  bookText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
