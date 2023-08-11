// CVBoxPDFContent.jsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// const CVBoxPDFContent = ({ jsonData }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         {/* Your PDF content here */}
//         <View>
//           <Text>{jsonData.BasicDetails && jsonData.BasicDetails.fullname}</Text>
//           {/* Other content from jsonData */}
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

const generatePdfContent = (jsonData) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* Your PDF content here */}
        <View>
          <Text>{jsonData.BasicDetails && jsonData.BasicDetails.fullname}</Text>
          {/* Other content from jsonData */}
        </View>
      </View>
    </Page>
  </Document>
);

export default generatePdfContent;
