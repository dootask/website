# Check-in Settings (Administrator)

The check-in function is a convenient tool for managing member attendance. Administrators can enable or disable the check-in function as needed and flexibly configure check-in methods and rules. Below are the specific steps and instructions.

## I. Function Activation

### 1. Enable Check-in Function
- Enter the **Check-in Management** page.
- Select **Enable** in the **Function Activation** section.

### 2. Check-in Settings
- Click **Member Check-in Settings** or **Export Check-in Data** for further management.

## II. Check-in Rule Configuration

### 1. Check-in Time
- **Check-in Time Range**: Set the time period for check-in, e.g., 09:00 to 18:00.
- **Earliest/Latest Check-in Time**: Adjust the allowed minutes before or after (default is 120 minutes).
- **Check-in Reminder Time**:
  - **Check-in Time Reminder**: Set how many minutes before or after to send check-in notifications.
  - **Repeat Check-in Reminder**: Configure whether to enable and set interval time.

### 2. Special Permissions
- **Allow Members to Upload Avatar**: Choose **Allow** or **Forbid**.
- **Allow Members to Modify MAC Address** (for WiFi check-in): Choose **Allow** or **Forbid**.

## III. Check-in Methods

- **Face Recognition**: Complete check-in through facial recognition
- **WiFi Check-in**: Automatically complete check-in by connecting to specified WiFi networks
- **Location Check-in**: Complete check-in through geographic location (requires mobile operation)
- **Manual Check-in**: Users can check in by manually clicking the check-in button

![Check-in Settings](/images/en/cin_set_1.png)

## IV. Description of Check-in Methods

### 1. Face Recognition Check-in
- Ensure devices are working properly
- Configure **Check-in Devices**
- Set whether to allow repeated check-ins as needed

![Face Recognition Settings](/images/en/cin_set_2.png)

### 2. WiFi Check-in

1. WiFi check-in usually has a delay of no more than 1 minute.
2. Members need to connect to the specified wireless network (WiFi) for automatic check-in.
3. Devices support routers with OpenWrt system.
4. If you need to disable the check-in function, please reinstall the service.
5. Execute commands to complete installation:

![WiFi Check-in Installation Commands](/images/en/cin_set_3.png)

### 3. Location Check-in
- Set **Check-in Name**, e.g., "Location Check-in".
- Configure **Baidu Map AK**, which can be obtained from [Baidu Map Developer Platform](https://lbs.baidu.com/).

![Location Check-in Settings](/images/en/cin_set_4.png)

### 4. Manual Check-in
- Users can check in directly by clicking the check-in button.

![Manual Check-in Settings](/images/en/cin_set_5.png)

## V. Common Issues

1. **How to resolve WiFi check-in failures?**
   - Ensure the device is connected to the WiFi network specified by the administrator.
   - Check if the router supports OpenWrt system.

2. **Location check-in permission issues?**
   - Ensure location permissions are enabled on members' mobile devices.
   - When setting up Baidu Map AK, please use a valid developer key.

Through these steps, administrators can quickly set up and manage the check-in function, providing flexible attendance management services for members. For further assistance, please contact technical support.