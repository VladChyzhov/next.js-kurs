// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Calendar, Upload, User, X, FileText, FileArchive, File } from "lucide-react"
// import { FormSection } from "./components/form-section"
// import { FileUploadCard } from "./components/file-upload-card"

// export default function RussianPersonalFormV3() {
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const [formData, setFormData] = useState({
//     firstName: "Владислав",
//     middleName: "Вячеславович",
//     lastName: "Чижов",
//     firstNameLatin: "Vladyslav",
//     middleNameLatin: "Viacheslavovych",
//     lastNameLatin: "Chyzhov",
//     citizenship: "Ukraine",
//     workPermitDate: "06.05.2026",
//     email: "vlad.chyzhov78@gmail.com",
//     phone: "+46 76 247 59 06",
//     linkedinProfile: "https://www.linkedin.com/in/vladchyzhov/",
//   })

//   const [fileStates, setFileStates] = useState({
//     resume: { fileName: "current_resume.pdf", status: "uploaded" as const },
//     linkedinZip: { fileName: "linkedin_archive.zip", status: "uploaded" as const },
//     linkedinPdf: { fileName: "linkedin_profile.pdf", status: "uploaded" as const },
//   })

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const removeImage = () => {
//     setProfileImage(null)
//   }

//   const handleFileUpload = (file: File, type: keyof typeof fileStates) => {
//     console.log(`Uploading ${type}:`, file.name)
//     setFileStates((prev) => ({
//       ...prev,
//       [type]: { fileName: file.name, status: "uploading" as const },
//     }))

//     setTimeout(() => {
//       setFileStates((prev) => ({
//         ...prev,
//         [type]: { fileName: file.name, status: "uploaded" as const },
//       }))
//     }, 2000)
//   }

//   const handleFileRemove = (type: keyof typeof fileStates) => {
//     setFileStates((prev) => ({
//       ...prev,
//       [type]: { fileName: undefined, status: "empty" as const },
//     }))
//   }

//   return (
//     <div className="min-h-screen py-8 px-6" lang="ru">
//       <div className="max-w-7xl mx-auto">
//         <Card className="bg-surface-1 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-2xl p-10 hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)] transition-shadow">
//           <CardHeader className="pb-6">
//             <div className="text-center mb-6">
//               <h1 className="text-[28px]/[38px] font-semibold text-brand mb-2">Персональные данные</h1>
//               <p className="text-base/6" style={{ color: "#5F6673" }}>
//                 Заполните информацию о себе для создания профиля
//               </p>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-8">
//             {/* Main Content Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Left Column - Personal Info */}
//               <div className="lg:col-span-2 space-y-6">
//                 <FormSection title="Основная информация">
//                   <div className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="firstName" className="text-sm/5 font-medium text-text-high">
//                           Имя *
//                         </Label>
//                         <Input
//                           id="firstName"
//                           value={formData.firstName}
//                           onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                           className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                           aria-required="true"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="middleName" className="text-sm/5 font-medium text-text-high">
//                           Отчество
//                         </Label>
//                         <Input
//                           id="middleName"
//                           value={formData.middleName}
//                           onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
//                           className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="lastName" className="text-sm/5 font-medium text-text-high">
//                           Фамилия *
//                         </Label>
//                         <Input
//                           id="lastName"
//                           value={formData.lastName}
//                           onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                           className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                           aria-required="true"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="firstNameLatin" className="text-sm/5 font-medium text-text-high">
//                           Имя (латиницей) *
//                         </Label>
//                         <Input
//                           id="firstNameLatin"
//                           value={formData.firstNameLatin}
//                           onChange={(e) => setFormData({ ...formData, firstNameLatin: e.target.value })}
//                           className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                           aria-required="true"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="middleNameLatin" className="text-sm/5 font-medium text-text-high">
//                           Отчество (латиницей)
//                         </Label>
//                         <Input
//                           id="middleNameLatin"
//                           value={formData.middleNameLatin}
//                           onChange={(e) => setFormData({ ...formData, middleNameLatin: e.target.value })}
//                           className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="lastNameLatin" className="text-sm/5 font-medium text-text-high">
//                           Фамилия (латиницей) *
//                         </Label>
//                         <Input
//                           id="lastNameLatin"
//                           value={formData.lastNameLatin}
//                           onChange={(e) => setFormData({ ...formData, lastNameLatin: e.target.value })}
//                           className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                           aria-required="true"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </FormSection>

//                 <FormSection title="Контактная информация">
//                   <div className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="email" className="text-sm/5 font-medium text-text-high">
//                           Электронная почта *
//                         </Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           value={formData.email}
//                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                           className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                           aria-required="true"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="phone" className="text-sm/5 font-medium text-text-high">
//                           Номер телефона *
//                         </Label>
//                         <Input
//                           id="phone"
//                           value={formData.phone}
//                           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                           className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                           aria-required="true"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label className="text-sm/5 font-medium text-text-high">Гражданство</Label>
//                         <Select value={formData.citizenship}>
//                           <SelectTrigger className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 focus-visible:ring-2 focus-visible:ring-brand/50">
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent className="bg-surface-1 border-border shadow-lg">
//                             <SelectItem value="Ukraine">Украина</SelectItem>
//                             <SelectItem value="Poland">Польша</SelectItem>
//                             <SelectItem value="Germany">Германия</SelectItem>
//                             <SelectItem value="Sweden">Швеция</SelectItem>
//                             <SelectItem value="Russia">Россия</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="workPermit" className="text-sm/5 font-medium text-text-high">
//                           Разрешение на работу до
//                         </Label>
//                         <div className="relative">
//                           <Input
//                             id="workPermit"
//                             value={formData.workPermitDate}
//                             onChange={(e) => setFormData({ ...formData, workPermitDate: e.target.value })}
//                             className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 pr-12 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                           />
//                           <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-low" />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="linkedin" className="text-sm/5 font-medium text-text-high">
//                         Профиль LinkedIn
//                       </Label>
//                       <Input
//                         id="linkedin"
//                         value={formData.linkedinProfile}
//                         onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
//                         className="border-border focus:ring-2 focus:ring-brand/50 focus:border-brand bg-surface-1 transition-shadow duration-200 h-11 placeholder:text-text-low/60 focus-visible:ring-2 focus-visible:ring-brand/50"
//                       />
//                     </div>
//                   </div>
//                 </FormSection>
//               </div>

//               {/* Right Column - Photo & Files */}
//               <div className="space-y-6">
//                 <FormSection title="Фотография профиля">
//                   <div className="flex flex-col items-center gap-4">
//                     <div className="relative group">
//                       <Avatar className="h-24 w-24 border-2 border-border group-hover:border-brand/50 transition-colors duration-200 shadow-sm">
//                         <AvatarImage src={profileImage || undefined} />
//                         <AvatarFallback className="bg-surface-0 text-text-medium">
//                           <User className="h-10 w-10" />
//                         </AvatarFallback>
//                       </Avatar>
//                       {profileImage && (
//                         <button
//                           onClick={removeImage}
//                           className="absolute -top-2 -right-2 h-6 w-6 bg-danger text-white rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
//                           aria-label="Удалить фотографию профиля"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       )}
//                     </div>
//                     <div className="text-center">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                         id="photo-upload"
//                       />
//                       <Label
//                         htmlFor="photo-upload"
//                         className="inline-flex items-center gap-2 px-4 py-2.5 text-sm/5 font-medium text-text-medium bg-surface-1 border border-border rounded-lg hover:bg-surface-0 hover:border-brand cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
//                         tabIndex={0}
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter" || e.key === " ") {
//                             e.preventDefault()
//                             document.getElementById("photo-upload")?.click()
//                           }
//                         }}
//                       >
//                         <Upload className="h-4 w-4" />
//                         Выбрать файл
//                       </Label>
//                       <p className="text-xs/5 mt-2" style={{ color: "#5F6673" }}>
//                         JPEG, PNG. Максимум 5 МБ
//                       </p>
//                     </div>
//                   </div>
//                 </FormSection>

//                 <FormSection title="Документы" isLast>
//                   <div className="space-y-4">
//                     <FileUploadCard
//                       title="Текущее резюме"
//                       icon={File}
//                       fileName={fileStates.resume.fileName}
//                       status={fileStates.resume.status}
//                       maxSizeMB={10}
//                       accept=".pdf,.doc,.docx"
//                       onUpload={(file) => handleFileUpload(file, "resume")}
//                       onRemove={() => handleFileRemove("resume")}
//                       onDownload={() => console.log("Download resume")}
//                     />

//                     <FileUploadCard
//                       title="Архив LinkedIn (ZIP)"
//                       icon={FileArchive}
//                       fileName={fileStates.linkedinZip.fileName}
//                       status={fileStates.linkedinZip.status}
//                       maxSizeMB={25}
//                       accept=".zip"
//                       onUpload={(file) => handleFileUpload(file, "linkedinZip")}
//                       onRemove={() => handleFileRemove("linkedinZip")}
//                       onDownload={() => console.log("Download ZIP")}
//                     />

//                     <FileUploadCard
//                       title="Профиль LinkedIn (PDF)"
//                       icon={FileText}
//                       fileName={fileStates.linkedinPdf.fileName}
//                       status={fileStates.linkedinPdf.status}
//                       maxSizeMB={10}
//                       accept=".pdf"
//                       onUpload={(file) => handleFileUpload(file, "linkedinPdf")}
//                       onRemove={() => handleFileRemove("linkedinPdf")}
//                       onDownload={() => console.log("Download PDF")}
//                     />
//                   </div>
//                 </FormSection>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border">
//               <Button
//                 variant="outline"
//                 className="border-border text-text-medium bg-transparent hover:bg-surface-0 hover:border-brand transition-all duration-200 h-12 px-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
//               >
//                 Отмена
//               </Button>
//               <Button className="bg-brand text-white hover:brightness-105 active:scale-[.97] transition-transform duration-75 h-12 px-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 shadow-sm">
//                 Сохранить данные
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
