// ContactContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const ContactContext = createContext();

export const ContactContextProvider = ({ children }) => {
  const [contactInfos, setContactInfos] = useState([]);
  const [showAddPage, setShowAddPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showEditPage, setShowEditPage] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedContacts =
      JSON.parse(localStorage.getItem("contactInfos")) || [];
    setContactInfos(storedContacts);
  }, []);

  const addContact = (newContact) => {
    const isContactExists = contactInfos.some((contact) => {
      if (contact.phone === newContact.phone) {
        setMessage(`Contact already exist with name ${contact.name}`);
        return true;
      }
      return false;
    });

    if (isContactExists) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    setContactInfos((prevContacts) => {
      const updatedContacts = [...prevContacts, newContact];
      const sortedContacts = updatedContacts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      updateLocalStorage(sortedContacts);
      return sortedContacts;
    });
    setName("");
    setEmail("");
    setPhone("");
    setImage(null);
    setShowAddPage(false);
    setSuccessMessage(
      <span>
        {" "}
        <FontAwesomeIcon icon={faCheckCircle} /> Contact added successfully!
      </span>
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };
  const updateContact = (updatedContact) => {
    const isContactExists = contactInfos.some((contact) => {
      if (
        contact.id !== updatedContact.id &&
        contact.phone === updatedContact.phone
      ) {
        setMessage(`Contact already exist with name ${contact.name}`);
        return true;
      }
      return false;
    });
    if (isContactExists) {
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }
    setContactInfos((prevContacts) => {
      const updatedContacts = prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      );
      updateLocalStorage(updatedContacts);
      return updatedContacts;
    });
    setName("");
    setEmail("");
    setPhone("");
    setShowEditPage(false);
    setImage(null);
    setSuccessMessage(
      <span>
        {" "}
        <FontAwesomeIcon icon={faCheckCircle} /> Contact updated successfully!
      </span>
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };
  const updateLocalStorage = (contacts) => {
    localStorage.setItem("contactInfos", JSON.stringify(contacts));
  };
  const deleteContact = (id) => {
    setContactInfos((prevValue) => {
      const updatedContacts = prevValue.filter((contact) => contact.id !== id);
      updateLocalStorage(updatedContacts);
      return updatedContacts;
    });
    setSuccessMessage(
      <span>
        {" "}
        <FontAwesomeIcon icon={faCheckCircle} />
        Contact Deleted Successfully
      </span>
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };

  function toggleTheme() {
    setDarkMode((prevValue) => {
      console.log("Toggle theme called", !prevValue);
      return !prevValue;
    });
  }

  function startEditingContact(id) {
    setEditingContactId(id);
    setShowEditPage(true);
  }

  function stopEditingContact() {
    setEditingContactId(null);
    setShowEditPage(false);
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <ContactContext.Provider
      value={{
        contactInfos,
        addContact,
        showAddPage,
        setShowAddPage,
        searchTerm,
        setSearchTerm,
        successMessage,
        setSuccessMessage,
        deleteContact,
        toggleTheme,
        darkMode,
        showEditPage,
        setShowEditPage,
        editingContactId,
        startEditingContact,
        stopEditingContact,
        updateContact,
        message,
        setMessage,
        name,
        setName,
        phone,
        setPhone,
        email,
        setEmail,
        handleImageChange,
        image,
        setImage,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const UseContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }

  const {
    contactInfos,
    addContact,
    showAddPage,
    setShowAddPage,
    searchTerm,
    setSearchTerm,
    successMessage,
    setSuccessMessage,
    deleteContact,
    toggleTheme,
    darkMode,
    showEditPage,
    setShowEditPage,
    editingContactId,
    startEditingContact,
    stopEditingContact,
    updateContact,
    message,
    setMessage,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    handleImageChange,
    image,
    setImage,
  } = context;

  return {
    contactInfos,
    addContact,
    showAddPage,
    setShowAddPage,
    searchTerm,
    setSearchTerm,
    successMessage,
    setSuccessMessage,
    deleteContact,
    toggleTheme,
    darkMode,
    showEditPage,
    setShowEditPage,
    editingContactId,
    startEditingContact,
    stopEditingContact,
    updateContact,
    message,
    setMessage,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    handleImageChange,
    image,
    setImage,
  };
};
