import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  card: {
    backgroundColor: "#EDE8D0",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "#EDE8D0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  timeSlot: {
    backgroundColor: "#FFF",
    padding: 12,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedTimeSlot: {
    backgroundColor: "#EDE8D0",
    borderColor: "#BFAF80",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  bookButton: {
    backgroundColor: "#EDE8D0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  disabledTimeSlot: {
    backgroundColor: "#ccc",
    borderColor: "#999",
    opacity: 0.6, 
  },  
});

export default styles;
