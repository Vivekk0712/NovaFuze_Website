import React from 'react';
import { sessionLogout } from '../services/api';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Dashboard = ({ user }) => {
  const handleLogout = async () => {
    await sessionLogout();
    window.location.reload();
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="dashboard-card"> {/* Changed to dashboard-card */}
        <Card.Header as="h4" className="text-center bg-white border-0 pt-4 pb-3 text-dark"> {/* Changed to text-dark */}
          Dashboard
        </Card.Header>
        <Card.Body>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.h5 variants={itemVariants} className="text-center mb-4 text-dark">Welcome, {user.displayName || user.email || user.phoneNumber}</motion.h5> {/* Changed to text-dark */}
            <motion.div variants={itemVariants}>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-white text-dark"><b>UID:</b> {user.uid}</ListGroup.Item> {/* Changed to text-dark */}
                {user.email && <ListGroup.Item className="bg-white text-dark"><b>Email:</b> {user.email}</ListGroup.Item>} {/* Changed to text-dark */}
                {user.phoneNumber && <ListGroup.Item className="bg-white text-dark"><b>Phone:</b> {user.phoneNumber}</ListGroup.Item>} {/* Changed to text-dark */}
                <ListGroup.Item className="bg-white text-dark"> {/* Changed to text-dark */}
                  <b>Providers:</b> {user.providers ? user.providers.join(', ') : 'N/A'}
                </ListGroup.Item>
              </ListGroup>
            </motion.div>
            <motion.div variants={itemVariants} className="d-grid mt-4">
              <Button as={motion.button} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} variant="dark" onClick={handleLogout}> {/* Changed to variant="dark" */}
                Logout
              </Button>
            </motion.div>
          </motion.div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default Dashboard;
