# Akıllı Depo Yönetimi – Çalışma Raporu

## 1. Yapılan İşin Özeti

Bu proje, verilen Akıllı Depo Yönetimi case çalışması kapsamında geliştirilmiştir. Amaç; şirket yönetimi için gerekli CRUD işlemlerini sağlayan bir backend API ve bu API ile iletişim kuran bir frontend arayüzü geliştirmektir.

Backend tarafında .NET 9 Web API ve Entity Framework Core kullanılarak RESTful bir servis geliştirilmiştir. Frontend tarafında ise React + TypeScript kullanılarak kullanıcıların şirketleri listeleyebileceği, ekleyebileceği, güncelleyebileceği ve silebileceği bir arayüz oluşturulmuştur.

---

## 2. Kullanılan Teknolojiler

### Backend
- .NET 9 Web API
- Entity Framework Core
- SQL Server
- Katmanlı Mimari (Controller → Manager → Repository → Entity)

### Frontend
- React
- TypeScript
- Vite
- Axios

### Araçlar
- Swagger
- Git
- GitHub

---

## 3. Karşılaşılan Sorunlar ve Çözüm Yolları

### Node.js sürüm uyumsuzluğu
Frontend kurulum aşamasında Node.js v21 ile Vite arasında uyumsuzluk oluştu ve proje çalıştırılamadı. Bu sorun Node Version Manager (NVM) kullanılarak Node.js v20 LTS sürümüne geçilerek çözüldü.

### CORS problemi
Frontend ve backend farklı portlarda çalıştığı için API çağrılarında CORS hatası oluştu. Backend tarafında CORS policy eklenerek frontend’in API’ye erişimi sağlandı.

### Multi-tenant filtreleme
Verilerin farklı şirketlere ait olmasını sağlamak için tüm endpointlerde `companyId` parametresi ile filtreleme uygulanmıştır.

---

## 4. Mimari Kararlar ve Nedenleri

Proje katmanlı mimari kullanılarak geliştirilmiştir.

Katmanlar:

- Controller
- Business (Manager)
- Repository
- Entity
- DbContext

Bu mimari tercih edilmesinin sebebi:

- Kodun sürdürülebilir olması
- Sorumlulukların ayrılması
- Test edilebilirliğin artırılması

Repository pattern kullanılarak veri erişimi soyutlanmıştır.

---

## 5. Yapay Zeka Kullanımı

Proje geliştirme sürecinde bazı teknik konuların araştırılması ve çözüm önerileri için yapay zeka destekli araçlardan yararlanılmıştır. Özellikle aşağıdaki konularda destek alınmıştır:

- Proje mimarisinin planlanması
- React frontend yapısının oluşturulması
- CORS ve Node.js sürüm problemlerinin çözümü
- README ve dokümantasyon hazırlanması

Ancak tüm kod yapısı ve proje mantığı geliştirici tarafından kontrol edilerek düzenlenmiştir.
