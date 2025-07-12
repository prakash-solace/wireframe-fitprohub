import React, { useState } from 'react';
import {
  Box, Typography, Paper, Avatar, IconButton, TextField, Button, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

// Dummy connection requests
const initialRequests = [
  { id: 1, user: 'Alice', status: 'pending' },
  { id: 2, user: 'Carol', status: 'pending' },
];

const initialMessages = [
  { id: 1, user: 'Alice', avatar: '', text: 'Hi Bob! Ready for our session?', type: 'text', time: '09:00' },
  { id: 2, user: 'Bob', avatar: '', text: 'Absolutely! See you at 10.', type: 'text', time: '09:01' },
  { id: 3, user: 'Alice', avatar: '', text: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', type: 'image', time: '09:02' },
];

const Chat = () => {
  // Connection requests
  const [requests, setRequests] = useState(initialRequests);
  const [activeChatUser, setActiveChatUser] = useState(null);
  // Chat
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [imgDialog, setImgDialog] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState('');
  // Subscription offer
  const [offerDialog, setOfferDialog] = useState(false);
  const [notif, setNotif] = useState('');
  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Accept connection request
  const handleAcceptRequest = (req) => {
    setRequests(reqs => reqs.map(r => r.id === req.id ? { ...r, status: 'accepted' } : r));
    setActiveChatUser(req.user);
    setNotifications(n => [{ text: `Connection with ${req.user} accepted.`, type: 'connection', time: new Date().toLocaleTimeString() }, ...n]);
  };

  // Chat logic
  const handleSend = () => {
    if (input.trim()) {
      setMessages(msgs => [...msgs, { id: Date.now(), user: 'You', avatar: '', text: input, type: 'text', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setInput('');
      setNotifications(n => [{ text: `New message sent to ${activeChatUser || 'Bob'}.`, type: 'chat', time: new Date().toLocaleTimeString() }, ...n]);
    }
  };
  const handleSendImage = () => {
    if (imgUrl.trim()) {
      setMessages(msgs => [...msgs, { id: Date.now(), user: 'You', avatar: '', text: imgUrl, type: 'image', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setImgUrl('');
      setImgDialog(false);
      setNotifications(n => [{ text: `Image sent to ${activeChatUser || 'Bob'}.`, type: 'chat', time: new Date().toLocaleTimeString() }, ...n]);
    }
  };
  const handleEdit = idx => {
    setEditIdx(idx);
    setEditText(messages[idx].text);
  };
  const handleEditSave = () => {
    setMessages(msgs => msgs.map((m, i) => i === editIdx ? { ...m, text: editText } : m));
    setEditIdx(null);
    setEditText('');
  };
  const handleDelete = idx => {
    setMessages(msgs => msgs.filter((_, i) => i !== idx));
  };

  // Offer subscription
  const handleOfferSubscription = () => {
    setOfferDialog(false);
    setNotifications(n => [{ text: `Subscription offer sent to ${activeChatUser}.`, type: 'subscription', time: new Date().toLocaleTimeString() }, ...n]);
    setNotif('Subscription offer sent!');
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Chat & Connections</Typography>
      {/* Notifications Panel */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <NotificationsIcon color="primary" />
          <Typography fontWeight="bold">Notifications</Typography>
        </Box>
        {notifications.length === 0 ? (
          <Typography color="text.secondary">No notifications yet.</Typography>
        ) : (
          <List>
            {notifications.slice(0, 5).map((n, i) => (
              <ListItem key={i}>
                <ListItemText primary={n.text} secondary={n.time} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
      {/* Connection Requests */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <PersonAddIcon color="info" />
          <Typography fontWeight="bold">Connection Requests</Typography>
        </Box>
        {requests.filter(r => r.status === 'pending').length === 0 ? (
          <Typography color="text.secondary">No pending requests.</Typography>
        ) : (
          <List>
            {requests.filter(r => r.status === 'pending').map((r, i) => (
              <ListItem key={r.id}>
                <ListItemAvatar><Avatar>{r.user[0]}</Avatar></ListItemAvatar>
                <ListItemText primary={r.user} secondary="Wants to connect" />
                <Button variant="contained" size="small" onClick={() => handleAcceptRequest(r)}>Accept</Button>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
      {/* Chat Section (only if a connection is active) */}
      {activeChatUser && (
        <Paper sx={{ p: 2, maxHeight: 400, overflowY: 'auto', mb: 2, bgcolor: 'grey.50' }}>
          <Typography fontWeight="bold" mb={1}>Chat with {activeChatUser}</Typography>
          <List>
            {messages.map((msg, idx) => (
              <ListItem key={msg.id} alignItems="flex-start" sx={{ flexDirection: msg.user === 'You' ? 'row-reverse' : 'row' }}>
                <ListItemAvatar>
                  <Avatar>{msg.user[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={msg.user}
                  secondary={msg.type === 'image' ? (
                    <img src={msg.text} alt="chat-img" style={{ maxWidth: 120, borderRadius: 8, marginTop: 4 }} />
                  ) : msg.text}
                  sx={{ textAlign: msg.user === 'You' ? 'right' : 'left' }}
                />
                <Typography variant="caption" sx={{ alignSelf: 'flex-end', mx: 1 }}>{msg.time}</Typography>
                {msg.user === 'You' && (
                  <ListItemSecondaryAction sx={{ right: msg.user === 'You' ? 'auto' : 0, left: msg.user === 'You' ? 0 : 'auto' }}>
                    <IconButton size="small" onClick={() => handleEdit(idx)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(idx)}><DeleteIcon fontSize="small" /></IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {/* Chat Input and Offer Subscription */}
      {activeChatUser && (
        <Box display="flex" gap={1} mb={2}>
          <TextField
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            fullWidth
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setImgDialog(true)}><ImageIcon /></IconButton>
                  <IconButton color="primary" onClick={handleSend}><SendIcon /></IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button variant="outlined" color="secondary" startIcon={<LoyaltyIcon />} onClick={() => setOfferDialog(true)}>
            Offer Subscription
          </Button>
        </Box>
      )}
      {/* Image dialog */}
      <Dialog open={imgDialog} onClose={() => setImgDialog(false)}>
        <DialogTitle>Send Image</DialogTitle>
        <DialogContent>
          <TextField
            label="Image URL"
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImgDialog(false)}>Cancel</Button>
          <Button onClick={handleSendImage} variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
      {/* Edit dialog */}
      <Dialog open={editIdx !== null} onClose={() => setEditIdx(null)}>
        <DialogTitle>Edit Message</DialogTitle>
        <DialogContent>
          <TextField
            value={editText}
            onChange={e => setEditText(e.target.value)}
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditIdx(null)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Offer Subscription dialog */}
      <Dialog open={offerDialog} onClose={() => setOfferDialog(false)}>
        <DialogTitle>Offer Subscription</DialogTitle>
        <DialogContent>
          <Typography>Send a subscription offer to <b>{activeChatUser}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOfferDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleOfferSubscription}>Send Offer</Button>
        </DialogActions>
      </Dialog>
      {/* Notification Snackbar */}
      <Snackbar
        open={!!notif}
        autoHideDuration={2000}
        onClose={() => setNotif('')}
        message={notif}
      />
    </Box>
  );
};

export default Chat; 