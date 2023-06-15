import React, { useState } from 'react';
import { makeStyles, useMediaQuery  } from '@material-ui/core/styles';
import { Button, Switch, TextField, Typography, IconButton, withStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DragIndicatorIcon from '@material-ui/icons/Menu';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { blue } from '@material-ui/core/colors';
import { alpha, styled } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'grab',
    borderBottom: '1px solid #e0e0e0',
  },
  sectionContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    maxWidth: '100vw',
  },
  description: {
    marginTop: theme.spacing(1),
  },
  iconButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
  },
  textField: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  editOff: {
    backgroundColor: '#eaeaea',
    pointerEvents: 'none',
    color: '#b5b5b5',
  },
}));

const BlueSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: blue[800],
    '&:hover': {
      backgroundColor: alpha(blue[800], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: blue[800],
  },
  '& .MuiSwitch-thumb': {
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fontSize: '14px',
      color: '#ffffff',
    },
  },
}));
const label = { inputProps: { 'aria-label': 'Color switch demo' } };



const ResumeSection = ({ id, title, description, enabled, onEdit, onToggle, editDisable, onHandleEditDisable }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isDirty, setIsDirty] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleEdit = () => {
    setEditing(true);
    onHandleEditDisable(id);
  };

  const handleSave = () => {
    onEdit(id, newTitle);
    setEditing(false);
    setIsDirty(false);
    onHandleEditDisable(-1);
  };

  const handleCancel = () => {
    setEditing(false);
    setNewTitle(title);
    setIsDirty(false);
    onHandleEditDisable(-1);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
    setIsDirty(event.target.value !== title);
  };

  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const { listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // const sectionStyle = {
  //   ...style,
  //   // backgroundColor: editing ? '#f5f5f5' : 'transparent',
  // };

  const CustomToggleButton = styled(IconButton)(({ theme }) => ({
    width: '24px',
    height: '24px',
    backgroundColor: blue[800],
    '& svg': {
      fontSize: '15px',
      color: theme.palette.common.white,
    },
  }));


  const editClass = editDisable === -1 ? classes.section : editDisable === id ? classes.section : classes.editOff;

  return (
    <div className={`${classes.section} ${editClass} `} style={style} ref={setNodeRef}>
      <div className={classes.sectionContent}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton {...listeners}>
            <DragIndicatorIcon />
          </IconButton>
          <IconButton onClick={handleToggleDescription}>
            <InfoIcon />
          </IconButton>
          {editing ? (
            <div style={{ width: '30vw', margin: 2, paddingTop: 1 }}>
              <TextField
                value={newTitle}
                onChange={handleTitleChange}
                placeholder="Section Title"
                variant="outlined"
                fullWidth 
                className={`${classes.textField} ${classes.textFieldValue}`}
              />
            </div>
          ) : (
            <Typography variant="h6">{title}</Typography>
          )}
          <Typography variant="body1" className={classes.description} style={{ margin: 12, color: 'gray' }}>
            {showDescription && description}
          </Typography>
        </div>
        <div className={classes.iconButtonContainer}>
          {editing ? (
            <>
              <Button color="primary" disabled={!isDirty} onClick={handleSave}>
                Save
              </Button>
              <Button color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit}>
                <EditIcon />
              </Button>
            </>
          )}
          <BlueSwitch {...label}
            checkedIcon={<CustomToggleButton checked><CheckIcon /></CustomToggleButton>}
            icon={<CustomToggleButton><CloseIcon /></CustomToggleButton>} defaultChecked
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;



