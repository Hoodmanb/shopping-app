// import mongoose from 'mongoose';

// // Define the schema with an array of references
// const Schema = mongoose.Schema;
// const ReferenceSchema = new Schema({
//   userId: { type: String, required: true },
//   references: { type: [Object], required: true } // Array of references (should be objects)
// });

// // Check if the model already exists before creating it
// const ReferenceModel = mongoose.models.Reference || mongoose.model('Reference', ReferenceSchema);

// class Reference {
//   constructor() {
//     this.model = ReferenceModel;
//   }

//   // Add a reference based on userId
//   async addReference(userId, ref) {
//     try {
//       // Find the document by userId
//       let referenceDoc = await this.model.findOne({ userId });
      
//       if (!referenceDoc) {
//         // If no document exists, create a new one with the userId and reference in an array
//         const newReference = new this.model({ userId, references: [ref] }); // Use an array
//         await newReference.save();
//         return { message: 'Reference added for the user' };
//       } else {
//         // Check if the reference already exists using a custom condition
//         const exists = referenceDoc.references.some(existingRef => {
//           return existingRef.reference === ref.reference; // Adjust this condition to match your use case
//         });

//         // If the reference does not exist in the array, add it
//         if (!exists) {
//           referenceDoc.references.push(ref);
//           await referenceDoc.save();
//           return { message: 'Reference added to user references' };
//         } else {
//           return { message: 'Reference already exists for the user' };
//         }
//       }
//     } catch (error) {
//       console.error('Error adding reference:', error);
//       throw error;
//     }
//   }

//   // Add an `id` key to an existing reference object that matches the passed `ref`
//   async addRefId(userId, ref, idValue) {
//     try {
//       const referenceDoc = await this.model.findOne({ userId });
      
//       if (referenceDoc) {
//         const targetRef = referenceDoc.references.find(existingRef => existingRef.reference === ref);

//         if (targetRef) {
//           targetRef.id = idValue; // Add or update the `id` key
//           await referenceDoc.save();
//           return { message: 'ID added/updated for the reference' };
//         } else {
//           return { message: 'Reference not found in user references' };
//         }
//       } else {
//         return { message: 'No references found for the user' };
//       }
//     } catch (error) {
//       console.error('Error adding ID to reference:', error);
//       throw error;
//     }
//   }

//   // Add a `status` key to an existing reference object that matches the passed `ref`
//   async verified(userId, ref, status) {
//     try {
//       const referenceDoc = await this.model.findOne({ userId });
      
//       if (referenceDoc) {
//         const targetRef = referenceDoc.references.find(existingRef => existingRef.reference === ref);

//         if (targetRef) {
//           targetRef.status = status; // Add or update the `status` key
//           await referenceDoc.save();
//           return { message: 'Status added/updated for the reference' };
//         } else {
//           return { message: 'Reference not found in user references' };
//         }
//       } else {
//         return { message: 'No references found for the user' };
//       }
//     } catch (error) {
//       console.error('Error adding status to reference:', error);
//       throw error;
//     }
//   }

//   // Get a reference document based on userId
//   async getReference(userId) {
//     try {
//       const referenceDoc = await this.model.findOne({ userId });
      
//       if (referenceDoc) {
//         return referenceDoc;
//       } else {
//         return { message: 'No references found for the user' };
//       }
//     } catch (error) {
//       console.error('Error retrieving reference:', error);
//       throw error;
//     }
//   }
// }

// const reference = new Reference();
// export default reference;