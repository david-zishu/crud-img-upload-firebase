import { Modal, Header, Image, Button } from "semantic-ui-react";

const ModalComp = ({
  open,
  setOpen,
  img,
  name,
  info,
  email,
  contact,
  id,
  handleDelete,
}) => {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>User Detail</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={img} alt={name} wrapped />
        <Modal.Description>
          <Header>{name}</Header>
          <p>{email}</p>
          <p>{info}</p>
          <p>{contact}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Delete"
          labelPosition="right"
          icon="checkmark"
          color="red"
          onClick={() => handleDelete(id)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ModalComp;
