import React from "react";

interface IProps {}

const TemplateOne: React.FC<IProps> = () => {
  return (
    <>
      <div>Template one</div>
    </>
    // <Document
    //   author="MD Rashid Hussain @ Resu-Me"
    //   creator="Resu-Me"
    //   title="resume.pdf"
    //   language="english"
    // >
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}>
    //       <Text>Section #1</Text>
    //     </View>
    //     <View style={styles.section}>
    //       <Text>Section #2</Text>
    //     </View>
    //   </Page>
    // </Document>
  );
};

export default TemplateOne;
