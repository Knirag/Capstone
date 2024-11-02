import react, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Switch,
  Button,
  Modal,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import ToggleSwitch from "toggle-switch-react-native";
import Colours from "../constants/colors";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9", // Soft background for contrast
  },
  profileCardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 20,
    width: "100%", // Full width of the profile card
    alignItems: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileIcon: {
    backgroundColor: Colours.lightblue,
    borderRadius: 50,
    padding: 15,
    marginRight: 15,
  },
  profileTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginBottom: 5,
  },
  userContact: {
    fontSize: 16,
    color: Colours.mediumgray,
  },
  changeDetails: {
    marginTop: 5,
    alignSelf: "flex-end",
  },
  changeDetailsText: {
    fontSize: 14,
    color: Colours.skyblue,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    height: 50,
    width: "100%",
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderBottomColor: Colours.skyblue,
    marginBottom: 20,
  },
  headerText: {
    color: Colours.darkgray,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  body: {
    flex: 1,
    width: "90%",
  },
  settings: {
    width: "100%",
    paddingHorizontal: 5,
  },
  categories: {
    marginBottom: 20,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 15,
    color: Colours.darkgray,
  },
  categoryCard: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryInfo: {
    borderBottomWidth: 1,
    borderBottomColor: Colours.lightgray,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryOption: {
    fontSize: 16,
    color: Colours.darkgray,
  },
  icon: {
    marginLeft: 10,
    color: Colours.skyblue,
  },
  iconProfile: {
    fontSize: 80,
    color: Colours.skyblue,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  starRating: {
    flexDirection: "row",
    marginVertical: 10,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  feedbackInput: {
    width: "100%",
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: Colours.skyblue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const ProfileSettings = () => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [versionModalVisible, setVersionModalVisible] = useState(false);


  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleSubmitFeedback = () => {
    // Handle feedback submission (e.g., send to server or store)
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);
    setModalVisible(false);
    setFeedback(""); // Reset feedback input
    setRating(0); // Reset rating
  };

  const toggleSwitch = () => {
    setIsDarkMode((previousState) => !previousState);
    console.log(
      isDarkMode ? "Switched to Light Mode" : "Switched to Dark Mode"
    );
  };

  const navigation = useNavigation();

  const navigateToSecurity = () => {
    navigation.navigate("SecuritySettings");
  };
  const navigateToChangeDetails = () => {
    navigation.navigate("ProfileDetails");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <Icon
          name="settings-sharp"
          size={24}
          color={Colours.skyblue}
          style={styles.icon}
        />
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.settings}>
          {/* <View> */}
          {/* Profile Card */}
          <View style={styles.profileCardContainer}>
            <View style={styles.profileHeader}>
              <View style={styles.profileIcon}>
                <Icon
                  name="person-outline"
                  size={24}
                  style={styles.iconProfile}
                  color={Colours.darkgray}
                />
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.username}>John Doe</Text>
                <Text style={styles.userContact}>+123 456 7890</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.changeDetails}
              onPress={navigateToChangeDetails}
            >
              <Text style={styles.changeDetailsText}>Change Details</Text>
            </TouchableOpacity>
          </View>
          {/* Settings & Privacy */}
          <View style={styles.categories}>
            <Text style={styles.categoryName}>Settings & Privacy</Text>
            <View style={styles.categoryCard}>
              <TouchableOpacity
                style={styles.categoryInfo}
                onPress={navigateToSecurity}
              >
                <Text style={styles.categoryOption}>Security Options </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Notification Settings */}
          <View style={styles.categories}>
            <Text style={styles.categoryName}>Notification Settings</Text>
            <View style={styles.categoryCard}>
              <TouchableOpacity style={styles.categoryInfo}>
                <Text style={styles.categoryOption}>Push Notifications </Text>
                <ToggleSwitch
                  isOn={pushNotifications}
                  onColor={Colours.skyblue}
                  offColor="grey"
                  size="small"
                  onToggle={(isOn) => setPushNotifications(isOn)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryInfo}>
                <Text style={styles.categoryOption}>Email Notifications</Text>
                <ToggleSwitch
                  isOn={emailNotifications}
                  onColor={Colours.skyblue}
                  offColor="grey"
                  size="small"
                  onToggle={(isOn) => setEmailNotifications(isOn)}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Help Center */}
          <View style={styles.categories}>
            <Text style={styles.categoryName}>Help Center</Text>
            <View style={styles.categoryCard}>
              <TouchableOpacity style={styles.categoryInfo}>
                <Text style={styles.categoryOption}>FAQ </Text>
                {/* lINK TO FAQ Page */}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryInfo}
                onPress={() => setContactModalVisible(true)}
              >
                <Text style={styles.categoryOption}>Contact Support</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={contactModalVisible}
                onRequestClose={() => setContactModalVisible(false)}
              >
                <TouchableWithoutFeedback
                  onPress={() => setContactModalVisible(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalTitle}>Contact Support</Text>
                      <Text style={styles.contactText}>
                        Phone: +123 456 789
                      </Text>
                      <Text style={styles.contactText}>
                        Email: support@example.com
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
              {/* Feedback & Modal */}
              <TouchableOpacity
                style={styles.categoryInfo}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.categoryOption}>Feedback</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Provide Feedback</Text>

                    {/* Star Rating */}
                    <View style={styles.starRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                          key={star}
                          onPress={() => handleRating(star)}
                        >
                          <Icon
                            name={star <= rating ? "star" : "star-outline"}
                            size={30}
                            color={star <= rating ? "#FFD700" : "#ccc"}
                            style={styles.starIcon}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Feedback Text Input */}
                    <TextInput
                      style={styles.feedbackInput}
                      placeholder="Write your feedback..."
                      multiline
                      value={feedback}
                      onChangeText={setFeedback}
                    />

                    {/* Send Feedback Button */}
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={handleSubmitFeedback}
                    >
                      <Text style={styles.sendButtonText}>Send Feedback</Text>
                    </TouchableOpacity>

                    {/* Close Button */}
                    <Button
                      title="Close"
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          {/* App Preferences */}
          <View style={styles.categories}>
            <Text style={styles.categoryName}>App Preferences</Text>
            <View style={styles.categoryCard}>
              <TouchableOpacity style={styles.categoryInfo}>
                <Text style={styles.categoryOption}> Theme </Text>
                <Icon
                  name={isDarkMode ? "moon" : "sunny"}
                  size={20}
                  color={isDarkMode ? "#FFD700" : "#FFA500"}
                />
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  size="small"
                  onValueChange={toggleSwitch}
                  value={isDarkMode}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryInfo}>
                <Text style={styles.categoryOption}> Language</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryInfo}
                onPress={() => setVersionModalVisible(true)}
              >
                <Text style={styles.categoryOption}>Version Info</Text>
              </TouchableOpacity>
              {/* Modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setVersionModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>App Version</Text>
                    <Text style={styles.modalText}>Version: 1.0.0</Text>
                    <Text style={styles.modalText}>
                      Release Date: 2024-10-17
                    </Text>

                    {/* Close Button */}
                    <Button
                      title="Close"
                      onPress={() => setVersionModalVisible(false)}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    </View>
    // </View>
  );
};

export default ProfileSettings;
