import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { db, storage } from "../firebase/config";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  info: "",
  contact: "",
};

const AddEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const { name, email, info, contact } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "users", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is Pause");
              break;
            case "running":
              console.log("Upload is Running");
              break;

            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const validate = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!info) errors.info = "Info is required";
    if (!contact) errors.contact = "Contact is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (!id) {
      try {
        await addDoc(collection(db, "users"), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await updateDoc(doc(db, "users", id), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
    }

    navigate("/");
  };

  return (
    <div>
      <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <div>
              {isSubmit ? (
                <Loader active inline="centered" size="huge" />
              ) : (
                <>
                  <h2>{id ? "Update User" : "Add User"}</h2>
                  <hr />
                  <Form onSubmit={handleSubmit}>
                    <Form.Input
                      label="Name"
                      placeholder="Enter Name"
                      name="name"
                      error={errors.name ? { content: errors.name } : null}
                      onChange={handleChange}
                      value={name}
                      autoFocus
                    />
                    <Form.Input
                      label="Email"
                      placeholder="Enter Email"
                      name="email"
                      error={errors.email ? { content: errors.email } : null}
                      onChange={handleChange}
                      value={email}
                    />
                    <Form.TextArea
                      label="Info"
                      placeholder="Enter Info"
                      name="info"
                      error={errors.info ? { content: errors.info } : null}
                      onChange={handleChange}
                      value={info}
                    />
                    <Form.Input
                      label="Contact"
                      placeholder="Enter Contact"
                      error={
                        errors.contact ? { content: errors.contact } : null
                      }
                      name="contact"
                      onChange={handleChange}
                      value={contact}
                    />
                    <Form.Input
                      label="Upload"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                      primary
                      type="submit"
                      disabled={progress !== null && progress < 100}
                    >
                      {id ? "Update" : "Add User"}
                    </Button>
                  </Form>
                </>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AddEditUser;
