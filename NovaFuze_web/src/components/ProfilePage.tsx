import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { User, Mail, Phone, Save, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { updateProfile, getMe } from '../services/authApi';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phoneNumber: ''
  });
  const [originalData, setOriginalData] = useState({
    displayName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    fetchUserProfile();
    detectAuthMethod();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getMe();
      const userData = response.data;
      
      const profile = {
        displayName: userData.displayName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || ''
      };
      
      setProfileData(profile);
      setOriginalData(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!profileData.displayName.trim()) {
      toast.error('Name is required');
      return;
    }

    if (profileData.email && !isValidEmail(profileData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (profileData.phoneNumber && !isValidPhone(profileData.phoneNumber)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const updateData: any = {};
      
      // Only send changed fields
      if (profileData.displayName !== originalData.displayName) {
        updateData.displayName = profileData.displayName;
      }
      if (profileData.email !== originalData.email) {
        updateData.email = profileData.email;
      }
      if (profileData.phoneNumber !== originalData.phoneNumber) {
        updateData.phoneNumber = profileData.phoneNumber;
      }

      if (Object.keys(updateData).length === 0) {
        toast.info('No changes to save');
        return;
      }

      const response = await updateProfile(updateData);
      
      if (response.success) {
        toast.success('Profile updated successfully!');
        setOriginalData(profileData);
        // Refresh user data
        await fetchUserProfile();
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
  };

  const hasChanges = () => {
    return (
      profileData.displayName !== originalData.displayName ||
      profileData.email !== originalData.email ||
      profileData.phoneNumber !== originalData.phoneNumber
    );
  };

  const [authMethod, setAuthMethod] = useState('');

  const detectAuthMethod = async () => {
    try {
      const response = await getMe();
      const userData = response.data;
      
      if (userData.providers && userData.providers.length > 0) {
        const providers = userData.providers;
        if (providers.includes('phone')) setAuthMethod('Phone');
        else if (providers.includes('google.com')) setAuthMethod('Google');
        else if (providers.includes('password')) setAuthMethod('Email');
        else setAuthMethod('Other');
      } else {
        // Fallback detection based on available data
        if (userData.phoneNumber && !userData.email) setAuthMethod('Phone');
        else if (userData.email && userData.email.includes('@gmail.com')) setAuthMethod('Google');
        else if (userData.email) setAuthMethod('Email');
        else setAuthMethod('');
      }
    } catch (error) {
      console.error('Error detecting auth method:', error);
      setAuthMethod('');
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            onClick={goBack} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
              {authMethod && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Signed in with {authMethod}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="displayName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  This name will be used in emails and payment receipts
                </p>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                  {!originalData.email && (
                    <Badge variant="outline" className="text-xs text-orange-600">
                      Recommended
                    </Badge>
                  )}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Used for payment confirmations and important notifications
                </p>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                  {!originalData.phoneNumber && (
                    <Badge variant="outline" className="text-xs text-blue-600">
                      Optional
                    </Badge>
                  )}
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={profileData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Used for payment verification and support contact
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Why we need this information
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>Name:</strong> Personalized emails and payment receipts</li>
                      <li>• <strong>Email:</strong> Payment confirmations and support</li>
                      <li>• <strong>Phone:</strong> Payment verification and customer service</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={loading || !hasChanges()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                
                {hasChanges() && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setProfileData(originalData);
                      toast.info('Changes discarded');
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>

              {!hasChanges() && (
                <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Profile is up to date
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;