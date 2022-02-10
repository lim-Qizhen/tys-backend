from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
from datetime import timedelta

class StudentManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('User must have a valid email.')

        # normalize: change uppercase to lowercase automatically
        user = self.model(email=self.normalize_email(email),
                          **kwargs)
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(self, email, name, surname, password):
        user = self.create_user(
            email=email,
            name=name,
            surname=surname,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)

        return user

class Student(AbstractBaseUser):
    SCHOOL_CHOICES = [
        ('Admiralty_Secondary_School', 'Admiralty Secondary School'),
        ("Ahmad_Ibrahim_Secondary_School", "Ahmad_Ibrahim_Secondary_School"),
        ("Anderson_Secondary_School", "Anderson Secondary School"),
        ('Anglican_High_School', 'Anglican High School'),
        ("Anglo_Chinese_School_Barker_Road_", "Anglo-Chinese School (Barker Road)"),
        ("Anglo_Chinese_School_Independent", "Anglo-Chinese School (Independent)"),
        ("Ang_Mo_Kio_Secondary_School", "Ang Mo Kio Secondary School"),
        ("Assumption_English_School", "Assumption English School"),
        ("Bartley_Secondary_School", "Bartley Secondary School"),
        ("Beatty_Secondary_School", "Beatty Secondary School"),
        ("Bedok_Green_Secondary_School", "Bedok Green Secondary School"),
        ("Bedok_South_Secondary_School", "Bedok South Secondary School"),
        ("Bedok_View_Secondary_School", "Bedok View Secondary School"),
        ("Bendemeer_Secondary_School", "Bendemeer Secondary School"),
        ("Boon_Lay_Secondary_School",  "Boon Lay Secondary School"),
        ("Bowen_Secondary_School",  "Bowen Secondary School"),
        ("Broadrick_Secondary_School", "Broadrick Secondary School"),
        ("Bukit_Batok_Secondary_School", "Bukit Batok Secondary School"),
        ("Bukit_Merah_Secondary_School", "Bukit Merah Secondary School"),
        ("Bukit_Panjang_Government_High_School", "Bukit Panjang Government High School"),
        ("Bukit_View_Secondary_School", "Bukit View Secondary School"),
        ("Catholic_High_School",  "Catholic High School"),
        ("Canberra_Secondary_School",  "Canberra Secondary School"),
        ("Cedar_Girls_Secondary_School", "Cedar Girls' Secondary School"),
        ("Changkat_Changi_Secondary_School	", "Changkat Changi Secondary School"),
        ("CHIJ_Katong_Convent_Secondary", "CHIJ Katong Convent (Secondary)"),
        ("CHIJ_Secondary_Toa_Payoh", "CHIJ Secondary (Toa Payoh)"),
        ("CHIJ_St_Josephs_Convent",  "CHIJ St. Joseph's Convent"),
        ("CHIJ_St_Nicholas_Girls_School", "CHIJ St. Nicholas Girls' School"),
        ("CHIJ_St_Theresas_Convent", "CHIJ St. Theresa's Convent"),
        ("Chua_Chu_Kang_Secondary_School", "Chua Chu Kang Secondary School"),
        ("Christ_Church_Secondary_School", "Christ Church Secondary School"),
        ("Chung_Cheng_High_School_Main", "Chung Cheng High School (Main)"),
        ("Chung_Cheng_High_School_Main",  "Chung Cheng High School (Main)"),
        ("Clementi_Town_Secondary_School", "Clementi Town Secondary School"),
        ("Commonwealth_Secondary_School", "Commonwealth Secondary School"),
        ("Compassvale_Secondary_School", "Compassvale Secondary School"),
        ("Crescent_Girls_School",  "Crescent Girls' School"),
        ("Crest_Secondary_School",  "Crest Secondary School"),
        ("Damai_Secondary_School",  "Damai Secondary School"),
        ("Deyi_Secondary_School",  "Deyi Secondary School"),
        ("Dunearn_Secondary_School",  "Dunearn Secondary School"),
        ("Dunman_High_School",  "Dunman High School"),
        ("Dunman_Secondary_School",  "Dunman Secondary School"),
        ("East_Spring_Secondary_School", "East Spring Secondary School"),
        ("Evergreen_Secondary_School", "Evergreen Secondary School"),
        ("Fairfield_Methodist_Secondary_School", "Fairfield Methodist Secondary School"),
        ("Fajar_Secondary_School",  "Fajar Secondary School"),
        ("Fuchun_Secondary_School",  "Fuchun Secondary School"),
        ("Fuhua_Secondary_School",  "Fuhua Secondary School" ),
        ("Geylang_Methodist_School_Secondary", "Geylang Methodist School (Secondary)"),
        ("Greendale_Secondary_School", "Greendale Secondary School"),
        ("Greenridge_Secondary_School", "Greenridge Secondary School"),
        ("Guangyang_Secondary_School", "Guangyang Secondary School"),
        ("Hai_Sing_Catholic_School",  "Hai Sing Catholic School"),
        ("Hillgrove_Secondary_School", "Hillgrove Secondary School"),
        ("Holy_Innocents_High_School", "Holy Innocents' High School"),
        ("Hong_Kah_Secondary_School",  "Hong Kah Secondary School"),
        ("Hougang_Secondary_School", "Hougang Secondary School"),
        ("Hua_Yi_Secondary_School", "Hua Yi Secondary School" ),
        ("Hwa_Chong_Institution", "Hwa Chong Institution"),
        ("Junyuan_Secondary_School", "Junyuan Secondary School" ),
        ("Jurong_Secondary_School",  "Jurong Secondary School" ),
        ("Jurong_West_Secondary_School", "Jurong West Secondary School"),
        ("Jurongville_Secondary_School", "Jurongville Secondary School"),
        ("Juying_Secondary_School",  "Juying Secondary School"),
        ("Kent_Ridge_Secondary_School", "Kent Ridge Secondary School"),
        ("Kranji_Secondary_School",  "Kranji Secondary School"),
        ("Kuo_Chuan_Presbyterian_Secondary_School", "Kuo Chuan Presbyterian Secondary School"),
        ("Loyang_View_Secondary_School", "Loyang View Secondary School"),
        ("Manjusri_Secondary_School",  "Manjusri Secondary School"),
        ("Maris_Stella_High_School",  "Maris Stella High School"),
        ("Marsiling_Secondary_School", "Marsiling Secondary School"),
        ("Mayflower_Secondary_School", "Mayflower Secondary School"),
        ("Meridian_Secondary_School",  "Meridian Secondary School"),
        ("Methodist_Girls_School_Secondary", "Methodist Girls' School (Secondary)"),
        ("Montfort_Secondary_School",  "Montfort Secondary School"),
        ("Nan_Chiau_High_School",  "Nan Chiau High School"),
        ("Nan_Hua_High_School",  "Nan Hua High School"),
        ("Nanyang_Girls_High_School", "Nanyang Girls' High School"),
        ("National_Junior_College",  "National Junior College"),
        ("Naval_Base_Secondary_School", "Naval Base Secondary School"),
        ("New_Town_Secondary_School",  "New Town Secondary School"),
        ("Ngee Ann Secondary School",  "Ngee Ann Secondary School"),
        ("North_Vista_Secondary_School", "North Vista Secondary School"),
        ("Northbrooks_Secondary_School", "Northbrooks Secondary School"),
        ("Northland_Secondary_School", "Northland Secondary School"),
        ("NUS_High_School_of_Mathematics_and_Science", "NUS High School of Mathematics and Science"),
        ("Orchid_Park_Secondary_School", "Orchid Park Secondary School"),
        ("Outram_Secondary_School",  "Outram Secondary School"),
        ("Pasir_Ris_Crest_Secondary_School", "Pasir Ris Crest Secondary School"),
        ("Pasir_Ris_Secondary_School", "Pasir Ris Secondary School"),
        ("Paya_Lebar_Methodist_Girls_School_Secondary", "Paya Lebar Methodist Girls' School (Secondary)"),
        ("Pei_Hwa_Secondary_School",  "Pei Hwa Secondary School"),
        ("Peicai_Secondary_School",  "Peicai Secondary School"),
        ("Peirce_Secondary_School",  "Peirce Secondary School"),
        ("Ping_Yi_Secondary_School",  "Ping Yi Secondary School"),
        ("Presbyterian_High_School",  "Presbyterian High School"),
        ("Punggol_Secondary_School",  "Punggol Secondary School"),
        ("Queenstown_Secondary_School", "Queenstown Secondary School"),
        ("Queensway_Secondary_School", "Queensway Secondary School"),
        ("Raffles_Girls_School_Secondary", "Raffles Girls' School (Secondary)"),
        ("Raffles_Institution",  "Raffles Institution"),
        ("Regent_Secondary_School",  "Regent Secondary School"),
        ("Riverside_Secondary_School", "Riverside Secondary School"),
        ("River_Valley_High_School",  "River Valley High School"),
        ("St_Andrews_Secondary_School", "St. Andrew's Secondary School"),
        ("St_Patricks_School",  "St. Patrick's School"),
        ("School_of_Science_and_Technology_Singapore", "School of Science and Technology, Singapore"),
        ("School_of_the_Arts",  "School of the Arts"),
        ("Sembawang_Secondary_School", "Sembawang Secondary School"),
        ("Sengkang_Secondary_School",  "Sengkang Secondary School"),
        ("Serangoon_Garden_Secondary_School", "Serangoon Garden Secondary School"),
        ("Serangoon_Secondary_School", "Serangoon Secondary School"),
        ("Shuqun_Secondary_School",  "Shuqun Secondary School"),
        ("Singapore_Chinese_Girls_School",  "Singapore Chinese Girls' School"),
        ("Singapore_Sports_School",  "Singapore Sports School"),
        ("Spectra_Secondary_School",  "Spectra Secondary School"),
        ("Springfield_Secondary_School", "Springfield Secondary School"),
        ("St_Anthonys_Canossian_Secondary_School", "St. Anthony's Canossian Secondary School"),
        ("St_Gabriels_Secondary_School", "St. Gabriel's Secondary School"),
        ("St_Hildas_Secondary_School", "St. Hilda's Secondary School"),
        ("St_Margarets_Secondary_School", "St. Margaret's Secondary School"),
        ("St_Josephs_Institution",  "St. Joseph's Institution"),
        ("Swiss_Cottage_Secondary_School", "Swiss Cottage Secondary School"),
        ("Tanglin_Secondary_School",  "Tanglin Secondary School"),
        ("Tampines_Secondary_School",  "Tampines Secondary School"),
        ("Tanjong_Katong_Girls_School", "Tanjong Katong Girls' School"),
        ("Tanjong_Katong_Secondary_School", "Tanjong Katong Secondary School"),
        ("Teck_Whye_Secondary_School", "Teck Whye Secondary School"),
        ("Temasek_Junior_College",  "Temasek Junior College"),
        ("Temasek_Secondary_School",  "Temasek Secondary School"),
        ("Unity_Secondary_School",  "Unity Secondary School"),
        ("Victoria_School",  "Victoria School"),
        ("West_Spring_Secondary_School", "West Spring Secondary School"),
        ("Westwood_Secondary_School",  "Westwood Secondary School"),
        ("Whitley_Secondary_School",  "Whitley Secondary School"),
        ("Woodgrove_Secondary_School", "Woodgrove Secondary School"),
        ("Woodlands_Ring_Secondary_School", "Woodlands Ring Secondary School"),
        ("Woodlands_Secondary_School", "Woodlands Secondary School"),
        ("Xinmin_Secondary_School",  "Xinmin Secondary School"),
        ("Yio_Chu_Kang_Secondary_School", "Yio Chu Kang Secondary School"),
        ("Yishun_Secondary_School",  "Yishun Secondary School"),
        ("Yishun_Town_Secondary_School", "Yishun Town Secondary School"),
        ("Yuan_Ching_Secondary_School", "Yuan Ching Secondary School"),
        ("Yuhua_Secondary_School",  "Yuhua Secondary School"),
        ("Yusof_Ishak_Secondary_School", "Yusof Ishak Secondary School"),
        ("Yuying_Secondary_School",  "Yuying Secondary School"),
        ("Zhenghua_Secondary_School",  "Zhenghua Secondary School"),
        ("Zhonghua_Secondary_School",  "Zhonghua Secondary School"),
    ]


    SUBJECT_CHOICES = [
        ('Science_(Physics)', 'Science (Physics)'),
        ('Science_(Chemistry)', 'Science (Chemistry)'),
        ('Science_(Biology)', 'Science (Biology)'),
        ('Physics', 'Physics'),
        ('Chemistry', 'Chemistry'),
        ('Biology', 'Biology'),
        ('Science', 'Science'),
    ]
    EXAM_CHOICES = [
        ('Normal_(Academic)', 'Normal (Academic)'),
        ('Normal_(Technical)', 'Normal (Technical)'),
        ('Express', 'Express'),
    ]

    last_login = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True, primary_key=True)
    contact = models.IntegerField(unique=True)
    email = models.EmailField(unique=True)
    school = models.CharField(max_length=100, choices=SCHOOL_CHOICES)
    subject = ArrayField(models.CharField(max_length=100, choices=SUBJECT_CHOICES))
    exams = ArrayField(models.CharField(max_length=100, choices=EXAM_CHOICES))
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    objects = StudentManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username


class StudentPaper(models.Model):
    username = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    paper_id = models.ForeignKey('papers.Paper', on_delete=models.DO_NOTHING)
    completed = models.BooleanField(default=False)
    results = models.FloatField(default=0)
    duration = models.DurationField(default=timedelta(days=0, seconds=0))
    reviewed = models.BooleanField(default=False)

    # def __str__(self):
    #     return self.username


#for review
class StudentCompletedPapers(models.Model):
    ANSWER_CHOICES = [
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ('D','D'),
    ]
    username = models.CharField(max_length=100)
    paper_id = models.CharField(max_length=255)
    question_number = models.IntegerField()
    question_img = models.CharField(max_length=255)
    answer = models.CharField(max_length=1, choices = ANSWER_CHOICES)
    student_answer = models.CharField(max_length=1, choices = ANSWER_CHOICES)
    accuracy = models.BooleanField()
    solution = models.CharField(max_length=255)
