import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { LoginInfo } from "../../hooks/useSpaceUser";
import { VaultBackupType } from "@spacehq/sdk";

interface IProps {
  open: boolean;
  onRegister: (registerInfo: LoginInfo) => void;
  onLogin: (loginInfo: LoginInfo) => void;
  onCancel: () => void;
}

const LoginDialog: React.FC<IProps> = (props: IProps) => {
  const [uuid, setUuid] = React.useState<string>();
  const [passphrase, setPassphrase] = React.useState<string>();
  const [backupType, setBackupType] = React.useState<VaultBackupType>(VaultBackupType.Email);

  const handleRegister = () => {
    if (uuid === undefined || passphrase === undefined || backupType === undefined) { return; }

    const li = { uuid, passphrase, backupType };
    props.onRegister(li);
  };

  const handleSubmit = () => {
    if (uuid === undefined || passphrase === undefined || backupType === undefined) { return; }

    const li = { uuid, passphrase, backupType };
    props.onLogin(li);
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.onCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pick a UUID, passphrase & recovery type
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="uuid"
            label="UUID"
            type="text"
            fullWidth
            onChange={(v) => setUuid(v.target.value) }
          />
          <TextField
            margin="dense"
            id="passphrase"
            label="Passphrase"
            type="password"
            fullWidth
            onChange={(v) => setPassphrase(v.target.value) }
          />
          <TextField
            margin="dense"
            id="backuptype"
            label="Backup type"
            defaultValue="Email"
            type="text"
            fullWidth
            onChange={(v) => setBackupType(v.target.value as VaultBackupType.Email) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Login
          </Button>
          <Button onClick={props.onCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginDialog;
